from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Bucketlist(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_created = models.DateTimeField(auto_now=True)
    list_name = models.CharField(max_length=100, blank=True, default='')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=0)

class BucketlistItem(models.Model):
    PRIORITIES = (
        ('H', 'High'),
        ('M', 'Medium'),
        ('L', 'Low'),
    )
    bucketlist = models.ForeignKey(Bucketlist, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100, blank=True, default='')
    priority = models.CharField(max_length=1, choices=PRIORITIES)
    done = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_created = models.DateTimeField(auto_now=True)
