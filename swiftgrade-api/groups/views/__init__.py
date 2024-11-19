from .copy_group_view import CopyGroupView
from .groups_list_create_view import GroupsListCreateView
from .group_detail_view import GroupDetailView
from .groups_bulk_create_view import GroupsBulkCreateView
from .groups_generate_code_view import GenerateCodeGroupView
from .group_join_view import GroupJoinView
from .groups_add_students import GroupsAddStudentsView

__all__ = (
    "CopyGroupView",
    "GroupsListCreateView",
    "GroupDetailView",
    "GroupsBulkCreateView",
    "GenerateCodeGroupView",
    "GroupJoinView",
    "GroupsAddStudentsView"
)
