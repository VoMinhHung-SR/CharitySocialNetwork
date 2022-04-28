
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
# Create your models here.


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):

    male, female, secret = range(3)
    genders = [(male, 'Male'), (female, 'Female'), (secret, 'Secret')]

    avatar = models.ImageField(upload_to='avatar/%Y/%m', null=False)
    phone_number = models.CharField(max_length=20, null=False, blank=True, unique=True)
    address = models.CharField(max_length=255)
    date_of_birth = models.DateTimeField(null=False, auto_now_add=True)
    gender = models.PositiveIntegerField(choices=genders, default=male)
    friends = models.ManyToManyField('User', blank=True)


class FriendRequest(models.Model):
    from_user = models.ForeignKey(User,on_delete=models.CASCADE, related_name="from_user")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="to_user")


class Post(BaseModel):

    class Meta:
        # id (3...2...1)
        ordering = ["-id"]
    title = models.CharField(max_length=50, blank=True)
    description = RichTextField(blank=True)
    tags = models.ManyToManyField('Tag', blank=True)
    products = models.ManyToManyField('Product', through='ProductPostDetail', related_name='products_post')
    creators = models.ManyToManyField(User, through='Comment', related_name='users_comment_post')
    shared = models.ManyToManyField(User, through='Sharing', related_name='users_share_post')
    auctioneers = models.ManyToManyField(User, through='Auction', related_name='auctioneers_post')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title


class Tag(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Comment(BaseModel):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Sharing(BaseModel):
    description = RichTextField()
    tags = models.ManyToManyField(Tag, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Auction(BaseModel):
    price = models.IntegerField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


# Product&Cate
class Category(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(BaseModel):
    name = models.CharField(max_length=100, null=False, unique=True)
    image = models.ImageField(upload_to='uploads/products/%Y/%m')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class ProductPostDetail(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


# UserOption
class Notification(models.Model):
    message = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.message


class Report(models.Model):
    content = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content