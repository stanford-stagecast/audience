# Generated by Django 3.1.2 on 2020-11-04 09:48

from django.db import migrations, models
import puffer.models


class Migration(migrations.Migration):

    dependencies = [
        ('puffer', '0005_auto_20201022_1614'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiofeedback',
            name='audio_file',
            field=models.FileField(upload_to=puffer.models.user_directory_path),
        ),
    ]
