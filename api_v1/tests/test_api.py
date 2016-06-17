# from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from api_v1.models import User


class UserActions(APITestCase):
    def setUp(self):
        """add dummy user."""
        self.client.post('/api/v1/auth/register/',
                         {'username': 'arafat',
                          'password': 'nomasana',
                          'confirm_password': 'nomasana',
                          'email': 'arafat@yolo.com'},
                         format='json')
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'arafat',
                                     'password': 'nomasana'},
                                    format='json')
        self.token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)


    def test_register_user(self):
        """Test registration of new user."""
        response = self.client.post('/api/v1/auth/register/',
                                    {'username': 'rustic',
                                     'password': '123',
                                     'confirm_password': '123',
                                     'email': 'rustic@gmail.com'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(User.objects.all()), 2)

    def test_user_login(self):
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'arafat',
                                     'password': 'nomasana'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_token_refresh(self):
        response = self.client.post('/api/v1/auth/token-refresh/',
                                    {'token': self.token}, format='json')
        self.assertEqual(response.data['token'], self.token)

class BucketlistActions(APITestCase):
    def setUp(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'arafat',
                          'password': 'nomasana',
                          'confirm_password': 'nomasana',
                          'email': 'makmende@yolo.com'},
                         format='json')
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'arafat',
                                     'password': 'nomasana'},
                                    format='json')
        self.token = response.data['token']
        self.client.force_authenticate(token=self.token)
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        response2 = self.client.post('/api/v1/bucketlists/',
                                     {'list_name': 'Travelling'},
                                     format='json')
        self.first_bucketlist_id = str(response2.data['id'])

    def test_bucketlist_creation(self):
        response = self.client.post('/api/v1/bucketlists/',
                                    {'list_name': 'Travelling'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_bucketlist_access(self):
        response = self.client.get('/api/v1/bucketlists/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Travelling', str(response.data))

    def test_unauthenticated_bucketlist_access(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + '')
        response = self.client.get('/api/v1/bucketlists/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorised_bucketlist_access(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'catalyst',
                          'password': 'motosana',
                          'confirm_password': 'motosana',
                          'email': 'catalyst@yolo.com'},
                         format='json')
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'catalyst',
                                     'password': 'motosana'},
                                    format='json')
        catalyst_token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + catalyst_token)
        response2 = self.client.get('/api/v1/bucketlists/' +
                                    self.first_bucketlist_id + '/')
        self.assertEqual(response2.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_creating_empty_bucketlist(self):
        response = self.client.post('/api/v1/bucketlists/', {'list_name': ''},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_bucketlist_update(self):
        # Update the first bucketlist
        response = self.client.put('/api/v1/bucketlists/' +
                                   self.first_bucketlist_id + '/',
                                   {'list_name': 'Travelling the world'},
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'the world')

    def test_unauthorized_bucketlist_update(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'shakur',
                          'password': 'motosana',
                          'confirm_password': 'motosana',
                          'email': 'shakur@yolo.com'},
                         format='json')
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'shakur',
                                     'password': 'motosana'},
                                    format='json')
        shakur_token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + shakur_token)
        response2 = self.client.put('/api/v1/bucketlists/' +
                                    self.first_bucketlist_id + '/',
                                    {'list_name': 'Travelling the world'},
                                    format='json')
        self.assertEqual(response2.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_bucektlist_delete(self):
        response = self.client.post('/api/v1/bucketlists/',
                                    {'list_name': 'Running'},
                                    format='json')
        id = str(response.data['id'])
        response = self.client.delete('/api/v1/bucketlists/' + id + '/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class BucketlistItemActions(APITestCase):
    def setUp(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'bond007',
                          'password': 'nomasana',
                          'confirm_password': 'nomasana',
                          'email': 'bond007@yolo.com'},
                         format='json')
        auth_response = self.client.post('/api/v1/auth/login/',
                                         {'username': 'bond007',
                                          'password': 'nomasana'},
                                         format='json')
        self.token = auth_response.data['token']
        self.client.force_authenticate(token=self.token)
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        response2 = self.client.post('/api/v1/bucketlists/',
                                     {'list_name': 'Travelling'},
                                     format='json')
        self.first_bucketlist_id = str(response2.data['id'])

    def test_item_creation(self):
        response = self.client.post('/api/v1/bucketlists/' +
                                    self.first_bucketlist_id + '/items/',
                                    {'item_name': 'India'},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    def test_empty_item_creation(self):
        response = self.client.post('/api/v1/bucketlists/' +
                                    self.first_bucketlist_id + '/items/',
                                    {'item_name': ''},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #
    def test_item_update(self):
        post_response = self.client.post('/api/v1/bucketlists/' +
                                         self.first_bucketlist_id + '/items/',
                                         {'item_name': 'Chna'},
                                         format='json')
        id = str(post_response.data['id'])
        put_response = self.client.put('/api/v1/bucketlists/' +
                                       self.first_bucketlist_id + '/items/' +
                                       id + '/',
                                       {'item_name': 'China'}, format='json')
        self.assertEqual(put_response.status_code, status.HTTP_200_OK)
        self.assertContains(put_response, 'China')

    def test_unauthorized_item_update(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'alpacino',
                          'password': 'motosana',
                          'confirm_password': 'motosana',
                          'email': 'alpacino@yolo.com'},
                         format='json')
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'alpacino',
                                     'password': 'motosana',
                                     'confirm_password': 'motosana',
                                     'email': 'alpacino@yolo.com'},
                                    format='json')
        post_response = self.client.post('/api/v1/bucketlists/' +
                                         self.first_bucketlist_id + '/items/',
                                         {'item_name': 'Kayole'},
                                         format='json')
        id = str(post_response.data['id'])
        alpacino_token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + alpacino_token)
        response2 = self.client.put('/api/v1/bucketlists/' +
                                    self.first_bucketlist_id + '/items/' +
                                    id + '/', {'item_name': 'Rongai'},
                                    format='json')
        self.assertEqual(response2.status_code, status.HTTP_401_UNAUTHORIZED)
    def test_unauthorised_item_delete(self):
        self.client.post('/api/v1/auth/register/',
                         {'username': 'fergie',
                          'password': 'motosana',
                          'confirm_password': 'motosana',
                          'email': 'fergie@yolo.com'},
                         format='json')
        response = self.client.post('/api/v1/auth/login/',
                                    {'username': 'fergie',
                                     'password': 'motosana',
                                     })
        post_response = self.client.post('/api/v1/bucketlists/' +
                                         self.first_bucketlist_id + '/items/',
                                         {'item_name': 'Diani'},
                                         format='json')
        id = str(post_response.data['id'])
        fergie_token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + fergie_token)
        response2 = self.client.delete('/api/v1/bucketlists/' +
                                       self.first_bucketlist_id + '/items/' +
                                       id + '/')
        self.assertEqual(response2.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_item_delete(self):
        post_response = self.client.post('/api/v1/bucketlists/' +
                                         self.first_bucketlist_id + '/items/',
                                         {'item_name': 'Ethiopia'},
                                         format='json')
        id = str(post_response.data['id'])
        delete_response = self.client.delete('/api/v1/bucketlists/' +
                                             self.first_bucketlist_id +
                                             '/items/' + id + '/')
        self.assertEqual(delete_response.status_code, status.HTTP_200_OK)

    def test_non_exixtent_item_delete(self):
        self.client.post('/api/v1/bucketlists/' +
                         self.first_bucketlist_id + '/items/',
                         {'item_name': 'Nigeria'},
                         format='json')
        delete_response = self.client.delete('/api/v1/bucketlists/' +
                                             self.first_bucketlist_id +
                                             '/items/10/')
        self.assertEqual(delete_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_item_access(self):
        self.client.post('/api/v1/bucketlists/' +
                         self.first_bucketlist_id + '/items/',
                         {'item_name': 'Nigeria'},
                         format='json')
        items_response = self.client.get('/api/v1/bucketlists/' +
                                         self.first_bucketlist_id + '/items/')
        self.assertEqual(items_response.status_code, status.HTTP_200_OK)
