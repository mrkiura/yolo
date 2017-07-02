"""api_v1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url
from api_v1.api import BucketListViewSet, BucketListItemViewSet,\
    UserCreateViewSet
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token


urlpatterns = [
    url(r'^bucketlists/$',
        BucketListViewSet.as_view({'get': 'list_bucketlists',
                                   'post': 'create'})),
    url(r'^bucketlists/(?P<pk>[0-9]+)/$',
        BucketListViewSet.as_view({'get': 'list_bucketlist',
                                   'post': 'create',
                                   'put': 'update',
                                   'delete': 'destroy'})),
    url(r'^bucketlists/(?P<pk_bucketlist>[0-9]+)/items/$',
        BucketListItemViewSet.as_view({'get': 'list_items',
                                       'post': 'create'})),
    url(r'^bucketlists/(?P<pk_bucketlist>[0-9]+)/items/(?P<pk_item>[0-9]+)/$',
        BucketListItemViewSet.as_view({'put': 'update',
                                       'delete': 'destroy'})),
    url(r'^auth/login/', obtain_jwt_token),
    url(r'^auth/token-refresh/', refresh_jwt_token),
    url(r'^auth/register/',
        UserCreateViewSet.as_view({'post': 'create'})),
]
