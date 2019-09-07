import os


basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    JWT_SECRET_KEY = 'chansey-app'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False