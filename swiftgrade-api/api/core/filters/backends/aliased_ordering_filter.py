from rest_framework.filters import OrderingFilter


class AliasedOrderingFilter(OrderingFilter):
    ''' this allows us to "alias" fields on our model to ensure consistency at the API level
        We do so by allowing the ordering_fields attribute to accept a list of tuples.
        You can mix and match, i.e.:
        ordering_fields = (('alias1', 'field1'), 'field2', ('alias2', 'field2')) '''

    def remove_invalid_fields(self, queryset, fields, view, request):
        valid_fields = getattr(view, 'ordering_fields', self.ordering_fields)
        if valid_fields is None or valid_fields == '__all__':
            return super(AliasedOrderingFilter, self).remove_invalid_fields(queryset, fields, view, request)

        aliased_fields = {}
        for field in valid_fields:
            if isinstance(field, str):
                aliased_fields[field] = field
            else:
                aliased_fields[field[0]] = field[1]

        ordering = []
        for raw_field in fields:
            invert = raw_field[0] == '-'
            field = raw_field.lstrip('-')
            if field in aliased_fields:
                if invert:
                    ordering.append('-{}'.format(aliased_fields[field]))
                else:
                    ordering.append(aliased_fields[field])
        return ordering
