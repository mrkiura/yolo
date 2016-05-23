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
from api_v1.api import BucketListViewSet, BucketListItemViewSet,\
    UserCreateViewSet
from rest_framework_nested import routers
from rest_framework_jwt.views import obtain_jwt_token
from django.views.generic.base import TemplateView

router = routers.SimpleRouter()
router.register(r'bucketlists', BucketListViewSet)
#
bucketlist_router = routers.NestedSimpleRouter(router, r'bucketlists',
                                               lookup='bucketlists')

bucketlist_router.register(r'items', BucketListItemViewSet,
                           base_name='bucketlists-items')

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(bucketlist_router.urls)),
    url(r'^api/v1/auth/login/', obtain_jwt_token),
    url(r'^api/v1/auth/register/', UserCreateViewSet.as_view({'post': 'create'})),
    url(r'^api/v1/', include('rest_framework.urls')),
    url(r'^', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', TemplateView.as_view(template_name='index.html')),
]
