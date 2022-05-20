from django.contrib import admin
from django.urls import path
from django import forms
from django.utils.safestring import mark_safe

from .models import (Post, Comment,
                     User, Tag, Sharing,
                     Notification, Auction, FriendRequest)
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.template.response import TemplateResponse
from django.db.models import Count


# Register your models here.
class DemoAppAdminSite(admin.AdminSite):
    site_header = 'AdminCSN'

    def get_urls(self):
        return [
                   path('post-stats/', self.stats_view)
               ] + super().get_urls()

    def stats_view(self, request):
        post = Post.objects.filter(active=True).count()
        stats = Post.objects.annotate(post_like_count=Count('actions')).values('id', 'title', 'post_like_count')
        comments = Post.objects.annotate(post_comment_count=Count('comments')).values('id', 'post_comment_count')
        return TemplateResponse(request,
                                'admin/post-stats.html', {
                                    'count': post,
                                    # 'likes': likes,
                                    'comments': comments,
                                    'stats': stats
                                })


admin_site = DemoAppAdminSite(name='myAdmin')


class PostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Post
        fields = '__all__'


class PostTagInlineAdmin(admin.TabularInline):
    model = Post.tags.through


class TagAdmin(admin.ModelAdmin):
    inlines = (PostTagInlineAdmin,)


class PostAdmin(admin.ModelAdmin):
    forms = PostForm
    inlines = (PostTagInlineAdmin,)
    list_display = ['id', 'title', 'description', 'created_date', 'updated_date', 'author', 'image']
    list_filter = ['author', 'title', 'created_date']

    readonly_fields = ['show_image']

    def show_image(self, post):
        if post:
            return mark_safe(
                "<img src='/static/{0}' alt='{1}' width='200px'/>".format(post.image.name, post.title)
            )


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'first_name', 'last_name', 'email', 'address', 'avatar']
    list_filter = ['username']
    search_fields = ['username']
    readonly_fields = ['show_avatar']

    def show_avatar(self, user):
        if user:
            return mark_safe(
                "<img src='/static/{0}' alt='{1}' width='200px'/>".format(user.avatar.name, user.username)
            )


class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'from_user', 'to_user']


class ShareAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_date', 'updated_date', 'post', 'user']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'created_date', 'updated_date', 'post', 'user']


class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'user']


# class ReportAdmin(admin.ModelAdmin):
#     list_display = ['id', 'description', 'user']


class AuctionPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'price', 'created_date', 'updated_date', 'user', 'post']


admin_site.register(Post, PostAdmin)
admin_site.register(Tag, TagAdmin)
admin_site.register(User, UserAdmin)
admin_site.register(Comment, CommentAdmin)
admin_site.register(Sharing, ShareAdmin)
admin_site.register(Notification, NotificationAdmin)
# admin.site.register(Report, ReportAdmin)
admin_site.register(Auction, AuctionPostAdmin)
admin_site.register(FriendRequest, FriendRequestAdmin)
