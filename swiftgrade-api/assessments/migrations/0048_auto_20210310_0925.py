# Generated by Django 2.2 on 2021-03-10 09:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_auto_20210215_0753'),
        ('assessments', '0047_auto_20210225_0654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessment',
            name='status',
            field=models.CharField(choices=[('assigned', 'Assigned'), ('generating', 'Generating'), ('ready_for_assignment', 'Ready for assignment'), ('ready_for_download', 'Ready for download'), ('ready_for_generation', 'Ready for generating'), ('ready_for_scan', 'Ready for scan'), ('scanned', 'Scanned'), ('scanning', 'Scanning')], default='ready_for_generation', max_length=255),
        ),
        migrations.CreateModel(
            name='CompletedAssessment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assessments.Assessment')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.Student')),
            ],
        ),
    ]
