# Generated by Django 2.2 on 2020-05-14 10:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0013_auto_20200514_0938'),
    ]

    operations = [
        migrations.AddField(
            model_name='recognitionbatch',
            name='assessment',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='assessments.Assessment'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recognitionbatch',
            name='status',
            field=models.CharField(choices=[('complete', 'Complete'), ('processing', 'Processing')], default='processing', max_length=255),
        ),
    ]
