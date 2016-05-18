from django.contrib.auth.models import User
from models import Bucketlist, BucketlistItem
from rest_framework import viewsets
from serializers import UserSerializer, BucketlistSerializer, \
    BucketlistItemSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken import views
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import renderers

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
        token = Token.objects.create(user=user)
        return Response({'Authorization': token.key},
                        status=status.HTTP_201_CREATED)


class UserLoginView(views.ObtainAuthToken):
    renderer_classes, serializer_class, permission_classes = \
        (renderers.JSONRenderer,), AuthTokenSerializer, (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'Authorization': token.key})

class BucketListViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that exposes CRUD functionality for bucketlists.
    """
    queryset = Bucketlist.objects.all().order_by('-date_created')
    serializer_class = BucketlistSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        data = {'list_name': request.data['list_name'],
                'created_by': request.user.username}
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Please provide a valid bucketlistname'})

    def list(self, request):
        username = request.user.username
        bucketlists = Bucketlist.objects.filter(created_by=username)
        page = self.paginate_queryset(bucketlists)
        if page:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(bucketlists, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        return Response({'Message': 'Successfully deleted bucketlist'})


class BucketListItemViewSet(viewsets.ModelViewSet):
    """
    Api endpoint that exposes CRUD functionality for bucketlists.
    """
    queryset = BucketlistItem.objects.all().order_by('-date_created')
    serializer_class = BucketlistItemSerializer

    def create(self, request, bucketlists_pk):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(bucketlist_id=bucketlists_pk)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
