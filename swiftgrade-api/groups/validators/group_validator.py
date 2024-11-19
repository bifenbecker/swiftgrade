from django.utils.translation import ugettext as _
from collections import Counter
from groups.models import Group
from rest_framework import serializers


class GroupValidator:
    @staticmethod
    def validate_name(group_id, value, user):
        if Group.manager.filter(name=value, user_id=user.id).exclude(id=group_id).exists():
            raise serializers.ValidationError(_('This class already exists'))
        return value

    @staticmethod
    def validate_code(code, user):
        group = Group.manager.filter(code=code).first()
        if not group:
            raise serializers.ValidationError({'code': _(
                'Class code not found. Please check with your teacher and enter a new code')})

        students_ids = group.students.values_list('id', flat=True)
        if hasattr(user, 'student') and user.student.id in students_ids:
            raise serializers.ValidationError({'code': _('You are already in this class')})
        return {'group': group}

    @staticmethod
    def validate_groups(value, user):
        names = [item.get('name', None) for item in value]

        groups = Group.manager.filter(name__in=names, user_id=user.id).values('name')
        duplicates = [name for name, count in Counter(names).items() if count > 1]

        names_exists, errors = [group['name'] for group in groups], []
        for name in names:
            if not name or name.isspace():
                errors.append({'name': _('Class name required')})
            elif name in names_exists:
                errors.append({'name': _('This class already exists')})
            elif name in duplicates:
                errors.append({'name': _('Duplicate class name')})
            else:
                errors.append(None)

        if not all(i is None for i in errors):
            raise serializers.ValidationError(errors)
        return value
