from .base_filter_mixin import BaseFilterMixin


class StartsWithFilterMixin(BaseFilterMixin):
    def __get_start_with_params_mapper(self, fields):
        return {field: '__'.join([field, 'istartswith']) for field in fields}

    def get_starts_with_filter_params(self, params, fields):
        mapper = self.__get_start_with_params_mapper(fields)
        return self.get_filter_params(params, mapper)
