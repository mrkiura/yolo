from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from serializers import UserSerializer, BucketlistSerializer, BucketlistItemSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class UserCreateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        token = Token.objects.create(user=serializer.save())
        # import ipdb; ipdb.set_trace()
