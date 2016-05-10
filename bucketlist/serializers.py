from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import Bucketlist, BucketlistItem

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class BucketlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucketlist
        fields = ('list_name', 'created_by', 'date_created', 'date_modified')

class BucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketlistItem
        fields = ('item_name', 'created_by', 'date_created', 'date_modified')
