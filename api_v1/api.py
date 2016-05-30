from django.contrib.auth.models import User
from models import Bucketlist, BucketlistItem
from rest_framework import viewsets
from serializers import UserSerializer, BucketlistSerializer, \
    BucketlistItemSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_jwt.settings import api_settings
from permissions import IsOwner
from rest_framework.decorators import detail_route, list_route


class UserCreateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def create(self, request):
        data = request.data
        username, email, password = data['username'], data['email'], \
            data['password']
        user = User.objects.create_user(username=username, password=password,
                                        email=email)
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return Response({'token': token},
                        status=status.HTTP_201_CREATED)


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
                {'error': 'You dont have permissions to access the bucketlist'})

    def create(self, request):
        data = {'list_name': request.data['list_name'],
                'created_by': request.user.username}
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Please provide a valid bucketlistname'})

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

    def update(self, request, pk=None):
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
                    status=status.HTTP_403_FORBIDDEN)
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
                    'priority': request.data['priority'],
                    'bucketlist_id': int(pk_bucketlist)}
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save(bucketlist_id=pk_bucketlist)
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {'error': 'Please provide a valid bucketlist item name'})
        else:
            return Response(
                {'error': 'You dont have permissions to edit the bucketlist'})

    def update(self, request, pk_bucketlist, pk_item):
        return Response({'pk_bucketlist': pk_bucketlist,
                         'pk_item': pk_item})

    @list_route()
    def list_items(self, request, pk_bucketlist):
        items = BucketlistItem.objects.filter(bucketlist_id=pk_bucketlist)
        page = self.paginate_queryset(items)
        if page:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)
