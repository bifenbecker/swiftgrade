# Generated by Django 2.2 on 2020-03-30 14:25

import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assessments', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='AssessmentItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('kind', models.CharField(choices=[('numeric', 'Numeric'), ('fib', 'Fill in the blank'), ('mc', 'Multiple choice')], default='numeric', max_length=255)),
                ('setting', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), size=None)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assessment_items', to='assessments.Assessment')),
            ],
        ),
        migrations.CreateModel(
            name='AnswerMark',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kind', models.CharField(choices=[('answer', 'Answer'), ('unit', 'Unit'), ('significant_figure', 'Significant figure')], default='answer', max_length=255)),
                ('value', models.DecimalField(decimal_places=2, max_digits=5)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assessments.Answer')),
            ],
        ),
        migrations.AddField(
            model_name='answer',
            name='assessment_item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assessments.AssessmentItem'),
        ),
    ]
