from flask import Flask

from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config

app = Flask(__name__, static_folder="../../client/build/static", template_folder="../../client/build")
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)
api = Api(app)

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return models.RevokedTokenModel.is_jti_blacklisted(jti)

from app import routes

from app import resources