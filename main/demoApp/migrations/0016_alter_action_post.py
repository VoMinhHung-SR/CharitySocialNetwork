# Generated by Django 4.0.3 on 2022-05-07 11:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('demoApp', '0015_notification_active_notification_created_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='actions', to='demoApp.post'),
        ),
    ]
