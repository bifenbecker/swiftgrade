# Generated by Django 2.2 on 2020-05-18 22:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0018_auto_20200518_2131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answermark',
            name='answer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mark', to='assessments.Answer'),
        ),
    ]
