# yolo
[![Coverage Status](https://coveralls.io/repos/github/andela-akiura/yolo/badge.svg?branch=feature-review)](https://coveralls.io/github/andela-akiura/yolo?branch=feature-review)
[![Build Status](https://travis-ci.org/andela-akiura/yolo.svg?branch=feature-review)](https://travis-ci.org/andela-akiura/yolo)

## What is it?

An API  written in **Django** to help a user manage a personal [bucketlist](http://www.urbandictionary.com/define.php?term=bucket%20list)

## The Latest Version
This API is currently at Version 1.0 (the first version).

## Documentation
Documentation is available

## Installation
Clone the repo
```
git clone https://github.com/andela-akiura/yolo.git
```

Navigate to the root folder
```
cd yolo
```
Install the necessary packages
```

pip install -r requirements.txt
```



## Perform migrations
```
python server.py db migrate
python server.py db makemigrations
```

## Testing
To run the tests for the app, and see the coverage, run
```
nosetests --with-coverage
```

## REST API
Yolo has a RESTful Application Program Interface (API)

### Yolo's resources
The API resources are accessible at [localhost:8000/api/v1/](http://127.0.0.1:1738/api/v1.0/). They include:

| Resource URL | Methods | Description |
| -------- | ------------- | --------- |
| `/api/v1.0/` | GET  | The index |
| `/api/v1.0/auth/register/` | POST  | User registration |
|  `/api/v1.0/auth/login/` | POST | User login|
| `/api/v1.0/bucketlists/` | GET, POST | A user's bucket lists |
| `/api/v1.0/bucketlists/<id>/` | GET, PUT, DELETE | A single bucket list |
| `/api/v1.0/bucketlists/<id>/items/` | GET, POST | Items in a bucket list |
| GET `/api/v1.0/bucketlists/<id>/items/<item_id>/` | GET, PUT, DELETE| A single bucket list item|


| Method | Description |
|------- | ----------- |
| GET | Retrieves a resource(s) |
| POST | Creates a new resource |
| PUT | Updates an existing resource |
| DELETE | Deletes an existing resource |

## Sample requests
Before making requests, make sure the server is running by running `python server runserver`.
Open a new terminal and navigate to the bucketlist directory like before.

A sample request to register a new user with the username `flaskbot`
Run
```
http POST 127.0.0.1:5000/api/v1.0/auth/register/ username=kiurabot password=123

HTTP/1.0 200 OK
Content-Length: 183
Content-Type: application/json
Date: Fri, 15 Apr 2016 09:31:26 GMT
Server: Werkzeug/0.11.5 Python/2.7.11

{
    "duration": 10000,
    "token": "eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ2MDcyMjY4NiwiaWF0IjoxNDYwNzEyNjg2fQ.eyJpZCI6M30.Gdm0loJ9XRS-7Jxo7C8j5WjUM7QVXT8KTLTURaiDXcg",
    "username": "kiurabot"
}
```
A sample request to login as the new user `kiurabot`
```
http POST 127.0.0.1:5000/api/v1.0/auth/login/ username=kiurabot password=123

HTTP/1.0 200 OK
Content-Length: 161
Content-Type: application/json
Date: Fri, 15 Apr 2016 09:41:57 GMT
Server: Werkzeug/0.11.5 Python/2.7.11

{
    "duration": 10000,
    "token": "eyJhbGciOiJIUzI1NiIsImV4cCI6MTQ2MDcyMzMxNywiaWF0IjoxNDYwNzEzMzE3fQ.eyJpZCI6NH0.1KCQD47JyKWT1cOkITA8l5_TYVEtHfVIQqXP_qB9q3M"
}
```


## Built with
[Django](https://www.djangoproject.com/) |
[Django REST](http://www.django-rest-framework.org/) |
[React](https://facebook.github.io/react/)


## Author
[![Alex Kiura](http://0.gravatar.com/avatar/ea50741579447e4a8dcd743e10c25fd7?s=144)](https://github.com/andela-akiura)


## License

### The MIT License (MIT)

Copyright (c) 2016 Alex Kiura <alex.kiura@andela.com>

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
