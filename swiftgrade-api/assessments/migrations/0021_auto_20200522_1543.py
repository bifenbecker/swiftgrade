# Generated by Django 2.2 on 2020-05-22 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0020_merge_20200519_1353'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessmentresult',
            name='mark',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=4),
        ),
    ]
