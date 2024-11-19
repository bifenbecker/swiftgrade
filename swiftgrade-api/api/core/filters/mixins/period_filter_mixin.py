from .base_filter_mixin import BaseFilterMixin


class PeriodFilterMixin(BaseFilterMixin):
    def __get_period_params_mapper(self, fields):
        mapping = {}

        for field in fields:
            lower_border = 'gte'
            high_border = 'lte'
            if isinstance(field, (tuple, list)) and len(field) > 1:
                if field[1]:
                    high_border = 'gt'

                if len(field) > 2 and field[2]:
                    high_border = 'lt'

                field = field[0]

            mapping['_'.join([field, 'from'])] = '__'.join([field, lower_border])
            mapping['_'.join([field, 'to'])] = '__'.join([field, high_border])

        return mapping

    def get_period_filter_params(self, params, fields):
        mapper = self.__get_period_params_mapper(fields)
        return self.get_filter_params(params, mapper)
