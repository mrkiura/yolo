from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import Bucketlist, BucketlistItem

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, **validated_data):
        user = User(username=validated_data['username'],
                    email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user


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
        fields = ('item_name', 'priority', 'done', 'date_created',
                  'date_modified')
