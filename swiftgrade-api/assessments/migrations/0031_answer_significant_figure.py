# Generated by Django 2.2 on 2020-07-22 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0030_answer_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='significant_figure',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
