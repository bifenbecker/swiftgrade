# Generated by Django 2.2 on 2020-05-18 11:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0016_merge_20200517_1317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answersheetscanitem',
            name='answer_sheet_scan',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='scan_items', to='assessments.AnswerSheetScan'),
        ),
    ]
