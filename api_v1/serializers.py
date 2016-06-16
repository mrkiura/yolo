from django.contrib.auth.models import User
from rest_framework import serializers
from models import Bucketlist, BucketlistItem
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100, required=True)
    username = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(max_length=100,
                                     style={'input_type': 'password'},
                                     required=True, write_only=True)

    def validate(self, data):
        try:
            validate_email(data['email'])
            return data
        except ValidationError:
            raise serializers.ValidationError('The email is invalid.')

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class BucketlistItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(max_length=100)

    def validate(self, data):
        """Ensure item_name is not empty."""
        if data['item_name'] == '':
            raise serializers.ValidationError('Item name can not be empty.')
        return data

    class Meta:
        model = BucketlistItem
        fields = ('id', 'item_name', 'done', 'created_by',
                  'date_created', 'date_modified')


class BucketlistSerializer(serializers.ModelSerializer):
    items = BucketlistItemSerializer(many=True, read_only=True)
    list_name = serializers.CharField(max_length=100)

    def validate(self, data):
        """Ensure list_name is not equal."""
        if data['list_name'] == '':
            raise serializers.ValidationError('List name can not be empty.')
        return data

    class Meta:
        model = Bucketlist
        fields = ('id', 'list_name', 'created_by', 'date_created', 'date_modified',
                  'items')
