from django.db.models import Case, When

from rest_framework.filters import OrderingFilter


CREATED_AT_ORDERING_KEY = 'created_at'
SETTINGS_CREATED_AT_ORDERING_KEY = 'settings__created_at'


class AssessmentLookupFilter(OrderingFilter):
    '''Filter that works with extended list of valid
    fiedls to order querysets using lookup parameters
    '''
    def _get_custom_lookup_fields(self):
        return [SETTINGS_CREATED_AT_ORDERING_KEY]

    def _get_lookup_condition(self, param_name, value):
        return {f'{param_name}__isnull': value}

    def _prepare_ordering_annotation(self, param_name, ordering_key):
        '''Creates annotation that will divide queryset
        in two parts: the one that contains parameter with
        param_name and the one without it. After that the
        first part will be sorted using param_name parameter,
        and the second part - using 'created_at' parameter
        :param param_name: model parameter name
        :param ordering_key: ordering lookup parameter
        :returns: body for annotation to add ordering
        '''
        condition = self._get_lookup_condition(param_name, True)
        return {f'{param_name}_order': Case(
            When(**condition, then=CREATED_AT_ORDERING_KEY),
            default=ordering_key
        )}

    def get_valid_fields(self, queryset, view, context={}):
        valid_fields = super().get_valid_fields(queryset, view, context)
        lookup_fields = self._get_custom_lookup_fields()
        valid_fields.extend(((field, field) for field in lookup_fields))
        return valid_fields

    def filter_queryset(self, request, queryset, view):
        ordering = self.get_ordering(request, queryset, view)

        if ordering:
            for ordering_item in ordering:
                stripped_ordering_item = ordering_item.lstrip('-')

                if stripped_ordering_item in self._get_custom_lookup_fields():
                    parameter, _ = ordering_item.split('__')
                    stripped_parameter = parameter.lstrip('-')
                    stripped_ordering_item = ordering_item.lstrip('-')
                    ordering_annotation = self._prepare_ordering_annotation(
                        stripped_parameter, stripped_ordering_item,
                    )
                    return queryset.annotate(**ordering_annotation).order_by(f'{parameter}_order')

            return queryset.order_by(*ordering)

        return queryset
