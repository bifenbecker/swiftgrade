from django.conf.urls import url
from groups.views import (
    CopyGroupView,
    GroupsListCreateView,
    GroupDetailView,
    GroupsBulkCreateView,
    GenerateCodeGroupView,
    GroupJoinView,
    GroupsAddStudentsView,
)

urlpatterns = [
    url(r"^groups/$", GroupsListCreateView.as_view(), name="groups"),
    url(r"^groups/join/$", GroupJoinView.as_view(), name="join_to_group"),
    url(r"^groups/bulk_create/$", GroupsBulkCreateView.as_view(), name="groups_bulk_create"),
    url(r"^groups/add_students/$", GroupsAddStudentsView.as_view(), name="groups_add_students"),
    url(r"^groups/(?P<group_id>\d+)/$", GroupDetailView.as_view(), name="group_detail"),
    url(r"^groups/(?P<group_id>\d+)/copy/$", CopyGroupView.as_view(), name="copy_group"),
    url(r"^groups/(?P<group_id>\d+)/generate_code/$", GenerateCodeGroupView.as_view(), name="generate_code_group"),
]
