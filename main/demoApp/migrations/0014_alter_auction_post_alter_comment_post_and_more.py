# Generated by Django 4.0.3 on 2022-05-06 12:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('demoApp', '0013_rename_creators_post_creators_comment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='auction',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='auction', to='demoApp.post'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='demoApp.post'),
        ),
        migrations.AlterField(
            model_name='sharing',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sharing', to='demoApp.post'),
        ),
    ]