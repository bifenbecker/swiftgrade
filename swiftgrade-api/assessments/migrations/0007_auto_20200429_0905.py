# Generated by Django 2.2 on 2020-04-29 09:05

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0006_answersheet_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessmentitem',
            name='setting',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50), size=None),
        ),
    ]
