from enum import Enum


def get_from_choices(key, choices):
    return dict(choices).get(key)


class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((x.name, x.value) for x in cls)

    @classmethod
    def map_for_select_fields(cls, choices=()):
        choices = choices or cls.choices()
        return [{'label': el[1], 'value': el[0]} for el in choices]

    @classmethod
    def keys(cls):
        return [el.name for el in cls]

    @classmethod
    def choices_by_keys(cls, keys):
        return tuple((el.name, el.value) for el in cls if el.name in keys)

    @classmethod
    def get_value_by_key(cls, key):
        mapping = dict(cls.choices())
        return mapping[key]
