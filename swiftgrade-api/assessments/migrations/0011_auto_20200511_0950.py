# Generated by Django 2.2 on 2020-05-11 09:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0010_answersheetscanitem_page'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answersheetscan',
            name='assessment_result',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='assessments.AssessmentResult'),
        ),
    ]
