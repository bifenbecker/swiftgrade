# Generated by Django 2.2 on 2022-06-30 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0029_auto_20220620_0610'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='recent_printed_as',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='recent_released_as',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
