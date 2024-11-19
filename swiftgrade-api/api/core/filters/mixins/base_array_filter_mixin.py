from django.db.models import Q


class BaseArrayFilterMixin:
    def get_array_filter_params(self, params, params_mapper):
        filters = {}

        for field in params_mapper.keys():
            if params.getlist(field):
                filters[params_mapper[field]] = params.getlist(field)

        return Q(**filters)
