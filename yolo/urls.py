"""yolo URL Configuration

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

from django.conf.urls import url, include
from bucketlist.views import BucketListViewSet, BucketListItemViewSet,\
    UserCreateViewSet
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register(r'users', UserCreateViewSet)
router.register(r'bucketlists', BucketListViewSet)

bucketlist_router = routers.NestedSimpleRouter(router, r'bucketlists',
                                               lookup='bucketlists')
bucketlist_router.register(r'items', BucketListItemViewSet,
                           base_name='bucketlists-items')


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^', include(bucketlist_router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework'))
]
