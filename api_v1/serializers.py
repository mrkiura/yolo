from django.contrib.auth.models import User
from rest_framework import serializers
from models import Bucketlist, BucketlistItem


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100, required=True)
    username = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(max_length=100,
                                     style={'input_type': 'password'},
                                     required=True, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password',)

class BucketlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketlistItem
        fields = ('id', 'item_name', 'done', 'created_by',
                  'date_created', 'date_modified')


class BucketlistSerializer(serializers.ModelSerializer):
    items = BucketlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Bucketlist
        fields = ('id', 'list_name', 'created_by', 'date_created', 'date_modified',
                  'items')
