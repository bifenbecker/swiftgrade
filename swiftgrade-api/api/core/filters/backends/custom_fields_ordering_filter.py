from .aliased_ordering_filter import AliasedOrderingFilter


class CustomFieldsOrderingFilter(AliasedOrderingFilter):
    '''
        This filter allows make ordering by custom params. To order by custom parameter
        you shoul inherit from the filter and override `SPECIAL_ORDERING_PARAMS_MAPPER`.
        The mapper describe which query parameter should be process by which function.

        Example:

        class YourOrderingFilter(SpecialFieldsOrderingFilter):
            SPECIAL_ORDERING_PARAMS_MAPPER = {
                query_param: ('prepare_queryset_for_ordering_by_query_param', 'converted_query_param')
            }

            def prepare_queryset_for_ordering_by_query_param(request, queryset, field):
                ...
                queryset = queryset.annotate(converted_query_param=Count(some_field))
                ...
                return queryset

        - `prepare_queryset_for_ordering_by_query_param` - required - generaly used for annotation.
        - `converted_query_param` - generaly name of annatated field. If it's not provided it leaves `query_param` name

        To stop ordering after all custom params process set ORDER_ONLY_BY_SPECIAL_PARAMS to True.
    '''
    ORDER_ONLY_BY_SPECIAL_PARAMS = False
    SPECIAL_ORDERING_PARAMS_MAPPER = {}

    def prepare_queryset(self, request, queryset, intersection):
        for field in intersection:
            mapper_key = field[1:] if field[0] == '-' else field
            mapper_value = self.SPECIAL_ORDERING_PARAMS_MAPPER[mapper_key]
            function_name = mapper_value[0] if isinstance(mapper_value, (tuple, list)) else mapper_value

            queryset = getattr(self, function_name)(request, queryset, field)

        return queryset

    def convert_query_param(self, field):
        real_field = field[1:] if field[0] == '-' else field
        mapper_value = self.SPECIAL_ORDERING_PARAMS_MAPPER.get(real_field)
        if not mapper_value or isinstance(mapper_value, str) or \
                (isinstance(mapper_value, (tuple, list)) and len(mapper_value) < 2):
            return field

        return "{}{}".format('-' if field[0] == '-' else '', mapper_value[1])

    def filter_queryset(self, request, queryset, view):
        ordering = self.get_ordering(request, queryset, view)

        if ordering:
            special_params = {'-%s' % el for el in self.SPECIAL_ORDERING_PARAMS_MAPPER.keys()}
            special_params = special_params | set(self.SPECIAL_ORDERING_PARAMS_MAPPER.keys())

            intersection = special_params.intersection(set(ordering))

            if intersection:
                base_ordering_params = tuple(set(ordering).difference(special_params))
                queryset = self.prepare_queryset(request, queryset, intersection)

            params_for_converting = base_ordering_params if self.ORDER_ONLY_BY_SPECIAL_PARAMS else ordering

            converted_ordering = [*map(self.convert_query_param, params_for_converting)]

            queryset = queryset.order_by(*converted_ordering)

        return queryset
