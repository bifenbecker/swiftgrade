# Generated by Django 2.2 on 2020-08-26 08:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0034_auto_20200807_0752'),
    ]

    operations = [
        migrations.AddField(
            model_name='assessmentresult',
            name='answer_sheet_scan',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='assessments.AnswerSheetScan'),
        ),
    ]
