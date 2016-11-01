
from django.db import models
from django.test import TestCase
from factories import UserFactory, BucketlistFactory, BucketlistItemFactory


class UserModelTest(TestCase):

    def setUp(self):
        self.user = UserFactory.create(username='kiura')

    def test_user_creation(self):
        user = UserFactory.create(username='mwangi')
        self.assertEqual(user.username, 'mwangi')

class BucketlistModelTest(TestCase):
    def setUp(self):
        self.bucketlist = BucketlistFactory.create(list_name='Travelling')

    def test_bucketlist_name(self):
        self.assertEqual(self.bucketlist.list_name, 'Travelling')

class BuckerlistItemModelTest(TestCase):
    def setUp(self):
        self.item = BucketlistItemFactory.create(item_name='Lagos')

    def test_item_name(self):
        self.assertEqual(self.item.item_name, 'Lagos')
