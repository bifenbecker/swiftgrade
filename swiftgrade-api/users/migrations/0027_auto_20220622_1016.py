# Generated by Django 2.2 on 2022-06-22 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0026_auto_20220613_1359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_email_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
