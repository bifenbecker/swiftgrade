# Generated by Django 2.2 on 2020-04-01 07:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0002_auto_20200330_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessment',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assessments', to='groups.Group'),
        ),
    ]
