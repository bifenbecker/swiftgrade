from api.core.admin import SuperuserModelAdmin
from django import forms
from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group

from users.helpers import UserAdminHelper
from users.mixins import AdminCalculatedFieldsMixin, AdminFieldsOrderingMixin, AdminPermissionMixin
from users.models import LoginHistory, Student, User, VerificationCode


@admin.register(User)
class UserAdmin(AdminCalculatedFieldsMixin, AdminFieldsOrderingMixin, AdminPermissionMixin, admin.ModelAdmin):
    list_filter = ('role', )
    search_fields = ('username', )
    list_display = ('get_group', 'first_name', 'last_name', 'get_username_or_email', 'phone',
                    'get_registration_date', 'get_sign_up_device', 'get_last_login', 'get_last_login_device',
                    'get_last_group', 'get_last_assessment', 'get_last_printed_as', 'get_last_released_as', 'get_last_result',
                    'get_number_of_assessments_with_result', 'get_plan_type', 'get_expiry_date', 'get_status', 
                    'get_user_type', 'get_user_sex', 'school_type', 'get_subjects')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._admin_helper = UserAdminHelper()

    def changelist_view(self, request, extra_context=None):
        path_info = request.META['HTTP_REFERER'].split(request.META['PATH_INFO'])
        if path_info[-1] and not path_info[-1].startswith('?'):
            if not request.GET.get('role__exact'):
                q = request.GET.copy()
                q['role__exact'] = User.TEACHER
                request.GET = q
                request.META['QUERY_STRING'] = request.GET.urlencode()
        return super(UserAdmin, self).changelist_view(request, extra_context=extra_context)

    def get_form_class(self, fields_for_exclude):
        # Get form for email validation with excluding fields
        class UserForm(forms.ModelForm):
            def clean_email(self):
                email = self.cleaned_data.get('email')
                if User.objects.filter(email=email, status=User.ACTIVE).exclude(id=self.instance.id).exists():
                    raise forms.ValidationError("User with this email already exists.")
                return email

            class Meta:
                model = User
                exclude = fields_for_exclude
        return UserForm

    def get_form(self, request, obj=None, **kwargs):
        readonly_fields = []
        if not request.user.is_superuser:
            self.exclude = ['username', 'groups', 'last_login', 'enabled_popups', 'user_permissions',
                            'date_joined', 'is_staff', 'is_superuser', 'enabled_tutorials', 'popups_progress',
                            'tutorials_progress']
            if obj:
                self.exclude.append('password')
        else:
            self.exclude = ()
        return self.get_form_class(self.exclude)

    def save_model(self, request, obj, form, change):
        obj.username = obj.email
        new_password = request.POST.get('password')
        if not change and new_password:
            obj.password = make_password(new_password)
        if not change and obj.role == User.ADMIN:
            obj.is_staff = True
        super(UserAdmin, self).save_model(request, obj, form, change)
        if not change and obj.role == User.STUDENT:
            user = User.objects.get(email=obj.email)
            if not hasattr(user, 'student'):
                Student.objects.create(user=user)


class GroupsAdmin(GroupAdmin):
    def has_module_permission(self, request):
        return request.user.is_superuser


admin.site.register(Student, SuperuserModelAdmin)
admin.site.register(VerificationCode, SuperuserModelAdmin)
admin.site.unregister(Group)
admin.site.register(Group, GroupsAdmin)
admin.site.register(LoginHistory, SuperuserModelAdmin)
