# Generated by Django 2.2 on 2021-03-12 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0047_auto_20210225_0654'),
    ]

    operations = [
        migrations.AddField(
            model_name='answersheet',
            name='coordinate_id',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='answersheet',
            name='unnamed_coordinate_id',
            field=models.CharField(default='', max_length=255),
        ),
    ]
