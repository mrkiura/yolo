import os

if os.getenv('TRAVIS'):
    from test import *
if os.getenv('HEROKU') is not None:
    from .production import *
else:
    from base import *
