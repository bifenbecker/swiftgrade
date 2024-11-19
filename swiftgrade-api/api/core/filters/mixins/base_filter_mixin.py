from django.db.models import Q


class BaseFilterMixin:
    def get_filter_params(self, params, params_mapper):
        filters = {}

        for field in params_mapper.keys():
            if params.get(field):
                filters[params_mapper[field]] = params[field]

        return Q(**filters)
