# Generated by Django 2.2 on 2020-07-13 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0028_auto_20200623_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessmentresult',
            name='mark',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
