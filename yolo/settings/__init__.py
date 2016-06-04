import os

if os.getenv('TRAVIS'):
    from test import *
else:
    from base import *
