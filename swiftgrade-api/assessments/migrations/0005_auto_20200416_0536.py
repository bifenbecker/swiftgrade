# Generated by Django 2.2 on 2020-04-16 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0004_auto_20200413_0725'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answersheet',
            name='document_url',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='answersheet',
            name='preview_document_url',
            field=models.TextField(blank=True),
        ),
    ]
