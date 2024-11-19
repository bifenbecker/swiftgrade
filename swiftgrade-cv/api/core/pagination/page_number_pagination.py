from django.utils import six
from django.db.models import QuerySet
from collections import OrderedDict
from rest_framework import pagination
from django.utils.translation import ugettext as _
from rest_framework.response import Response
from django.core.paginator import InvalidPage
from rest_framework.exceptions import NotFound


class PageNumberPagination(pagination.PageNumberPagination):
    page_size_query_param = 'per_page'
    per_page = 20
    page_size_query_description = _(f'Number of results to return per page. Default is {per_page}.')

    def get_next_link(self):
        if not self.page.has_next() or str(self.page.number) in self.last_page_strings:
            return None

        return {'page': self.page.next_page_number()}

    def get_previous_link(self):
        if not self.page.has_previous():
            return None

        page_number = self.page.previous_page_number()
        if page_number == 1:
            return None

        return {'page': page_number}

    def paginate_queryset(self, queryset, request, view=None):
        """
        Paginate a queryset if required, either returning a
        page object, or `None` if pagination is not configured for this view.
        """
        page_size = self.get_page_size(request)
        if not page_size:
            if type(queryset) is QuerySet:
                page_size = queryset.count() or 1
            if type(queryset) is list:
                page_size = len(queryset) or 1

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages

        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=six.text_type(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        return list(self.page)

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('page', str(self.page.number)),
            ('per_page', self.page.paginator.per_page),
            ('results', data)
        ]))
