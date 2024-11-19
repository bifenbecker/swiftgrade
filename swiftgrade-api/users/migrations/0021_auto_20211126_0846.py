# Generated by Django 2.2 on 2021-11-26 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_auto_20210727_2253'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, choices=[('mr', 'Mr.'), ('ms', 'Ms.'), ('mx', 'Mx.')], max_length=255, null=True),
        ),
    ]
