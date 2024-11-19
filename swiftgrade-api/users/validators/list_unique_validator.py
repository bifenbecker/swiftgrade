from rest_framework import serializers
from django.utils.translation import ugettext as _


class ListUniqueValidator(object):
    message = _('This field must be unique.')

    def __init__(self, unique_field_names):
        self.unique_field_names = unique_field_names

    @staticmethod
    def has_duplicates(counter):
        return any([count for count in counter.values() if count > 1])

    def __call__(self, value):
        from collections import Counter
        field_counters = {
            field_name: Counter(
                item[field_name] for item in value
                if field_name in item
            )
            for field_name in self.unique_field_names
        }
        has_duplicates = any([
            ListUniqueValidator.has_duplicates(counter)
            for counter in field_counters.values()
        ])
        if has_duplicates:
            errors = []
            for item in value:
                error = {}
                for field_name in self.unique_field_names:
                    counter = field_counters[field_name]
                    if counter[item.get(field_name)] > 1:
                        error[field_name] = self.message
                errors.append(error)
            raise serializers.ValidationError(errors)
