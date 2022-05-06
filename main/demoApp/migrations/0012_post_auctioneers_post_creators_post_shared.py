# Generated by Django 4.0.3 on 2022-05-06 08:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demoApp', '0011_remove_post_auctioneers_remove_post_creators_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='auctioneers',
            field=models.ManyToManyField(related_name='auctioneers_post', through='demoApp.Auction', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='creators',
            field=models.ManyToManyField(related_name='users_comment_post', through='demoApp.Comment', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='post',
            name='shared',
            field=models.ManyToManyField(related_name='users_share_post', through='demoApp.Sharing', to=settings.AUTH_USER_MODEL),
        ),
    ]
