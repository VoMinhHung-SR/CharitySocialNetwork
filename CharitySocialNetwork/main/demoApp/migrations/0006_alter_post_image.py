# Generated by Django 4.0.3 on 2022-05-15 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demoApp', '0005_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, upload_to='posts/%Y/%m'),
        ),
    ]
