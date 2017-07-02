import os

if os.getenv('HEROKU') is not None:
    from yolo.settings.prod import *
elif os.getenv('TRAVIS') is not None:
    from yolo.settings.test import *
else:
    from yolo.settings.base import *
