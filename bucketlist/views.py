from django.contrib.auth.models import User
from models import Bucketlist, BucketlistItem
from rest_framework import viewsets
from serializers import UserSerializer, BucketlistSerializer, \
    BucketlistItemSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

class UserCreateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = Token.objects.create(user=serializer.save())
        data = serializer.data
        data.update({'token': token.key})
        return Response(data=data, status=status.HTTP_201_CREATED)


class BucketListViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that exposes CRUD functionality for bucketlists.
    """
    queryset = Bucketlist.objects.all().order_by('-date_created')
    serializer_class = BucketlistSerializer


class BucketListItemViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that exposes CRUD functionality for bucketlists.
    """
    queryset = BucketlistItem.objects.all().order_by('-date_created')
    serializer_class = BucketlistItemSerializer

    def create(self, request, bucketlists_pk):
        item_name = request.get('item_name', '')
        priority = request.get('priority', '')
        done = request.get('done', False)
        
