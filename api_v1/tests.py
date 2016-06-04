# from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from models import User


class UserActions(APITestCase):
    def setUp(self):
        """add dummy user."""
        self.client.post('/api/v1/auth/register/',
                         {'username': 'makemende',
                          'password': 'nomasana',
                          'email': 'makmende@yolo.com'}, format='json')

    def test_register_user(self):
        """Test registration of new user."""
        response = self.client.post('/api/v1/auth/register/',
                                    {'username': 'alex',
                                     'password': '123',
                                     'email': 'lxmwangi5@gmail.com'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(User.objects.all()), 2)

    def test_user_login(self):
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'makemende',
                                     'password': 'nomasana'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
