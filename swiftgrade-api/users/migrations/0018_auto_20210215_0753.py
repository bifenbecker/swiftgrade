# Generated by Django 2.2 on 2021-02-15 07:53

import django.contrib.postgres.fields.jsonb
from django.db import migrations
import users.models.user


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_remove_verificationcode_student'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_generic_popup_show',
        ),
        migrations.AddField(
            model_name='user',
            name='enabled_popups',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=users.models.user.get_enabled_popups_default_dict),
        ),
    ]
