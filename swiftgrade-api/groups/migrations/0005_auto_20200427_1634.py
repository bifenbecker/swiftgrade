# Generated by Django 2.2 on 2020-04-27 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0004_auto_20200413_0821'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='category',
            field=models.CharField(choices=[('algebra', 'Algebra'), ('astronomy', 'Astronomy'), ('biochemistry', 'Biochemistry'), ('biology', 'Biology'), ('botany', 'Botany'), ('business', 'Business'), ('calculus', 'Calculus'), ('chemistry', 'Chemistry'), ('computer', 'Computer'), ('different', 'Different'), ('electricity', 'Electricity'), ('engineering', 'Engineering'), ('environment', 'Environment'), ('ESL', 'ESL'), ('geography', 'Geography'), ('geology', 'Geology'), ('geometry', 'Geometry'), ('government', 'Government'), ('health', 'Health'), ('history', 'History'), ('language', 'Language'), ('law', 'Law'), ('marketing', 'Marketing'), ('math', 'Math'), ('nuclear', 'Nuclear'), ('physics', 'Physics'), ('probability', 'Probability'), ('quantum', 'Quantum'), ('relativity', 'Relativity'), ('science', 'Science'), ('statistic', 'Statistic'), ('trigonometry', 'Trigonometry')], default='different', max_length=255),
        ),
        migrations.AddField(
            model_name='group',
            name='category_img_number',
            field=models.IntegerField(default=1),
        ),
    ]
