from django.contrib import admin
from .models import Group
from api.core.admin import SuperuserModelAdmin

admin.site.register(Group, SuperuserModelAdmin)

# Register your models here.
