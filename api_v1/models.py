from __future__ import unicode_literals # pragma: no cover
from django.contrib.auth.models import User # pragma: no cover
from django.db import models # pragma: no cover


class Bucketlist(models.Model): # pragma: no cover
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    list_name = models.CharField(max_length=100, blank=True, default='')
    created_by = models.CharField(max_length=100, blank=True, default='')


class BucketlistItem(models.Model): # pragma: no cover
    bucketlist = models.ForeignKey(Bucketlist, on_delete=models.CASCADE,
                                   related_name="items")
    item_name = models.CharField(max_length=100, blank=True, default='')
    done = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    created_by = models.CharField(max_length=100, blank=True, default='')
