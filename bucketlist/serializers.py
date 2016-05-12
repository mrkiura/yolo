from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import Bucketlist, BucketlistItem


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class BucketlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucketlist
        fields = ('list_name', 'created_by', 'date_created', 'date_modified',
                  'items')

class BucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketlistItem
        fields = ('item_name', 'priority', 'done', 'date_created',
                  'date_modified')
