class AliasFilterMixin:
    '''
        This mixin converts request query params to view friendly query params using aliases.
        View friendly query params can be used in filtering and ordering.

        Example:

        class MyView(ApiView):
            ...
            aliases = (('query_param', 'alias_name'), ('query_param1', 'alias_name1', False))
            ...

        class YourFilterBackend(AliasFilterMixin, ...):
            ...
            def filter_queryset(self, request, queryset, view):
                params = self.convert_params_with_aliases(request.query_params, view)
            ...


        aliases - (('query_param', 'alias_name', replace=True),) - list or tuple of aliases.
        query_param - string - request query parameter.
        alias_name - string - view friendly query parameter.
        replace - boolean - should `query_param` be removed from request query_params list.

        Note: the mixin should be added before filtering or ordering filters that used the aliases.
    '''

    def convert_params_with_aliases(self, query_params, view):
        aliases = getattr(view, 'aliases', None)

        if isinstance(aliases, (list, tuple)):
            for element in aliases:
                if len(element) < 2:
                    raise IndexError('Required 2 parameters minimun')

                query_param = element[0]
                alias_name = element[1]
                try:
                    replace = element[2]
                except IndexError:
                    replace = True

                if query_param in query_params:
                    query_params._mutable = True

                    value = query_params.get(query_param)
                    if replace:
                        query_params.pop(query_param)

                    query_params[alias_name] = value

                    query_params._mutable = False

        return query_params
