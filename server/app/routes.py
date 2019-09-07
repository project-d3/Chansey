from app import app
from app import api
from flask import jsonify, render_template
from flask_restful import Resource
from .resources import *

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')



api.add_resource(UserRegistration, '/registration')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogoutAccess, '/logout/access')
api.add_resource(UserLogoutRefresh, '/logout/refresh')
api.add_resource(TokenRefresh, '/token/refresh')
api.add_resource(AllUsers, '/users')
api.add_resource(SecretResource, '/secret')
