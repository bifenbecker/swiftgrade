# Generated by Django 2.2 on 2022-07-20 14:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0031_auto_20220712_1150'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='recent_printed_as',
            new_name='last_printed_as',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='recent_released_as',
            new_name='last_released_as',
        ),
    ]
