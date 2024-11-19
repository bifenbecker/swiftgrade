from django.db.models.functions import Length
from django.db.models import QuerySet
import json
import re


DEFAULT_BATCH_SIZE = 100


def bulid_template(template, kv_dictionary):
    pattern = '|'.join(sorted(re.escape(k) for k in kv_dictionary))
    return re.sub(pattern, lambda m: kv_dictionary.get(m.group(0)), template, flags=re.IGNORECASE)

def batches(array, batch_size=DEFAULT_BATCH_SIZE):
    for index in range(0, len(array), batch_size):
        yield array[index:index + batch_size]


def generate_external_id(queryset, external_prefix):
    last_item = queryset.order_by(Length('external_id').desc(), '-external_id').first()

    prefix_index = 1
    if last_item:
        last_index = last_item.external_id.replace('{}_'.format(external_prefix), '')
        try:
            prefix_index = int(last_index) + 1
        except ValueError:
            pass

    return "{}_{}".format(external_prefix, prefix_index)


def convert_camel_case_to_snake_case(camel_case_string):
    string = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', camel_case_string)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', string).lower()


def convert_dict_to_query_string(params={}):
    args = []
    for key, value in params.items():
        if isinstance(value, (QuerySet, list, tuple)):
            value = ','.join([str(v) for v in value])

        args.append(f'{key}={value}')

    return '&'.join(args)


def prettify_json(data, sort_keys=True):
    data = data if isinstance(data, str) else json.dumps(data)
    parsed = json.loads(data)
    return json.dumps(parsed, indent=4, sort_keys=sort_keys)
