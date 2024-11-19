# Generated by Django 2.2 on 2023-01-31 08:37

import django.contrib.postgres.fields.jsonb
from django.db import migrations
import users.models.user


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0035_auto_20221006_1819'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='enabled_pulse_buttons',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=users.models.user.get_enabled_pulse_buttons_default_dict),
        ),
    ]
