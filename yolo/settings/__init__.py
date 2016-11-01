import os

if os.getenv('HEROKU') is not None:
    from .prod import *
elif os.getenv('TRAVIS') is not None:
    from test import *
else:
    from base import *
