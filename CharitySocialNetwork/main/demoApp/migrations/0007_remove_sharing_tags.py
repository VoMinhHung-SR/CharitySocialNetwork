# Generated by Django 4.0.3 on 2022-05-17 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('demoApp', '0006_alter_post_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sharing',
            name='tags',
        ),
    ]