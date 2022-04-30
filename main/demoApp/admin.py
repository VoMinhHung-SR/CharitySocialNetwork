from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe

from .models import (Post, Category, Comment,
                     User, Product, Tag, Sharing,
                     Report, Notification, Auction)
from ckeditor_uploader.widgets import CKEditorUploadingWidget


# Register your models here.

class PostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Post
        fields = '__all__'


# class UserFriendsInlineAdmin(admin.TabularInline):
#     model = User.friends.through


class PostTagInlineAdmin(admin.TabularInline):
    model = Post.tags.through


class TagAdmin(admin.ModelAdmin):
    inlines = (PostTagInlineAdmin,)


class PostAdmin(admin.ModelAdmin):
    inlines = (PostTagInlineAdmin,)
    forms = PostForm

    list_display = ['id', 'title', 'description', 'created_date', 'updated_date', 'author']
    list_filter = ['author', 'title', 'created_date']


class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_date', 'updated_date', 'image', 'category']
    readonly_fields = ['show_image']

    def show_image(self, product):
        if product:
            return mark_safe(
                "<img src='/static/{0}' alt='{1}' width='200px'/>".format(product.image.name, product.name)
            )


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


class UserAdmin(admin.ModelAdmin):
    # inlines = [UserFriendsInlineAdmin, ]
    list_display = ['id', 'username', 'first_name', 'last_name', 'email', 'address', 'avatar']
    list_filter = ['username']
    search_fields = ['username']
    readonly_fields = ['show_avatar']

    def show_avatar(self, user):
        if user:
            return mark_safe(
                "<img src='/static/{0}' alt='{1}' width='200px'/>".format(user.avatar.name, user.username)
            )


class ShareAdmin(admin.ModelAdmin):
    list_display = ['id', 'description', 'created_date', 'updated_date', 'post', 'user']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'created_date', 'updated_date', 'post', 'user']


class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'user']


# class ReportAdmin(admin.ModelAdmin):
#     list_display = ['id', 'description', 'user']


class AuctionPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'price', 'created_date', 'updated_date', 'user', 'post']


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Sharing, ShareAdmin)
admin.site.register(Notification, NotificationAdmin)
# admin.site.register(Report, ReportAdmin)
admin.site.register(Auction, AuctionPostAdmin)
