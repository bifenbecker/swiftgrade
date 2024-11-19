from .base_array_filter_mixin import BaseArrayFilterMixin


class InclusionFilterMixin(BaseArrayFilterMixin):
    def __get_inclusion_params_mapper(self, fields):
        return {"{}[]".format(field): '__'.join([field, 'in']) for field in fields}

    def get_inclusion_filter_params(self, params, fields):
        mapper = self.__get_inclusion_params_mapper(fields)
        return self.get_array_filter_params(params, mapper)
