from django.contrib.auth.models import User
from models import Bucketlist, BucketlistItem
from rest_framework import viewsets
from serializers import UserSerializer, BucketlistSerializer, \
    BucketlistItemSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from permissions import IsOwner
from rest_framework.decorators import detail_route, list_route


class UserCreateViewSet(viewsets.ModelViewSet):
    """
    API View that receives a POST with a user's username and password.

    Returns a JSON Web Token that can be used for authenticated requests..
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def create(self, request):
        data = request.data
        username, email = data.get('username'), data.get('email')
        password, confirm_password = data.get('password'),\
            data.get('confirm_password')
        if password == confirm_password:
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                User.objects.create_user(username=username, password=password,
                                         email=email)
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            else:
                return Response({'error':
                                 'The email was not valid.'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'The passwords do not match'},
                            status=status.HTTP_400_BAD_REQUEST)

class BucketListViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that exposes CRUD functionality for bucketlists.
    """
    queryset = Bucketlist.objects.all().order_by('-date_created')
    serializer_class = BucketlistSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    @detail_route()
    def list_bucketlist(self, request, pk):
        bucketlist = Bucketlist.objects.get(pk=pk)
        if request.user.username == bucketlist.created_by:
            serializer = self.get_serializer(bucketlist)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'You dont have permissions to access the bucketlist'},
                status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request):
        data = {'list_name': request.data['list_name'],
                'created_by': request.user.username}
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Please provide a valid bucketlistname'},
                            status=status.HTTP_400_BAD_REQUEST)

    @list_route()
    def list_bucketlists(self, request):
        username = request.user.username
        bucketlists = Bucketlist.objects.filter(created_by=username)
        page = self.paginate_queryset(bucketlists)
        if page:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(bucketlists, many=True)
        return Response(serializer.data)

    def update(self, request, pk):
        bucketlist = Bucketlist.objects.get(pk=pk)
        if bucketlist:
            if request.user.username == bucketlist.created_by:
                bucketlist.list_name = request.data['list_name']
                serializer = self.get_serializer(bucketlist)
                bucketlist.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'You dont have permissions to access the bucketlist'},
                    status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(
                {'error': 'You dont have permissions to access the bucketlist'},
                status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk):
        Bucketlist.objects.get(pk=pk).delete()
        return Response({'Message': 'Successfully deleted bucketlist'})


class BucketListItemViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that exposes CRUD functionality for bucketlists.
    """
    queryset = BucketlistItem.objects.all().order_by('-date_created')
    serializer_class = BucketlistItemSerializer
    permission_classes = (IsAuthenticated, IsOwner,)

    def create(self, request, pk_bucketlist):
        bucketlist = Bucketlist.objects.get(pk=pk_bucketlist)
        if request.user.username == bucketlist.created_by:
            data = {'item_name': request.data['item_name'],
                    'created_by': request.user.username,
                    'bucketlist_id': int(pk_bucketlist)}
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save(bucketlist_id=pk_bucketlist)
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {'error': 'Please provide a valid bucketlist item name'},
                    status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {'error': 'You dont have permissions to edit the bucketlist'},
                status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, pk_bucketlist, pk_item):
        try:
            item = BucketlistItem.objects.get(pk=pk_item)
            if item.created_by == request.user.username:
                item_name = request.data.get('item_name', '')
                done = request.data.get('done')
                if item_name:
                    item.item_name = item_name
                if done:
                    item.done = done
                serializer = self.get_serializer(item)
                item.save()
                return Response(serializer.data)
            else:
                return Response(
                    {'error': 'You dont have permissions to edit the item'},
                    status=status.HTTP_401_UNAUTHORIZED)
        except BucketlistItem.DoesNotExist:
            return Response(
                {'error': 'The requested item was not found'},
                status=status.HTTP_404_NOT_FOUND)
    def destroy(self, request, pk_bucketlist, pk_item):
        try:
            item = BucketlistItem.objects.get(pk=pk_item)
            if item.created_by == request.user.username:
                item.delete()
                return Response({'message': 'Item successfully deleted'})
            else:
                return Response(
                    {'error': 'You dont have permissions to delete the item'},
                    status=status.HTTP_401_UNAUTHORIZED)
        except BucketlistItem.DoesNotExist:
            return Response(
                {'error': 'The requested item was not found'},
                status=status.HTTP_404_NOT_FOUND)

    @list_route()
    def list_items(self, request, pk_bucketlist):
        items = BucketlistItem.objects.filter(bucketlist_id=pk_bucketlist)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)
