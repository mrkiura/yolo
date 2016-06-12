from factory import Factory, SubFactory
from api_v1.models import User, Bucketlist, BucketlistItem
from datetime import datetime

class UserFactory(Factory):
    class Meta:
        model = User

    username = 'matwana'
    password = 'chachisha'
    email = 'mwatwana@gmail.com'

class BucketlistFactory(Factory):
    class Meta:
        model = Bucketlist

    list_name = 'Travelling'
    date_created = datetime(2016, 6, 12, 9, 30)
    date_modified = datetime(2016, 6, 12, 9, 30)
    created_by = 'matwana'

class BucketlistItemFactory(Factory):
    class Meta:
        model = BucketlistItem

    bucketlist = SubFactory(BucketlistFactory)
    item_name = 'Rongai'
    done = False
    date_created = datetime(2016, 6, 12, 10, 30)
    date_modified = datetime(2016, 6, 12, 11, 30)
    created_by = 'matwana'
