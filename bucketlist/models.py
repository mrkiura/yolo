from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Bucketlist(models.Model):
    """
    Define a bucketlist.

    Attributes:
        user (ForeignKey): ForeignKey to the user.
        list_name (str): A unique identifier for a bucketlist.
        date_created (dateTime): Date of bucketlist creation.
        date_modified (dateTime): Date of bucketlist modification.
    """

    date_created = models.DateTimeField(auto_now_add=True)
    date_created = models.DateTimeField(auto_now=True)
    list_name = models.CharField(max_length=100, blank=True, default='')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=0)


class BucketlistItem(models.Model):
    """Define items in a user's bucketlist.

    Attributes:
        bucketlist (ForeignKey): ForeignKey to the bucketlist.
        item_name (str): A unique identifier for a bucketlist.
        priority (choice): An item's priority. High, Medium or Low.
        date_created (dateTime): Date of bucketlist item creation.
        done (bool): A flag to mark completed bucketlist items.
        date_modified (dateTime): Date of bucketlist item modification.
    """

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
