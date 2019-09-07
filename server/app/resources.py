from flask_restful import Resource, reqparse
from app import api
from .models import UserModel
from app import db


parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)


class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        new_user = UserModel(username = data['username'], password = data['password'])
        print("user: {} password: {} ".format(new_user.username, new_user.password))
        try:
            db.session.add(new_user)
            db.session.commit()
            return {
                'message': 'User has been registered: {}'.format(new_user.username)
            }
        except:
            return {
                'message': 'Error while attempting to register user.'
            }


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        return {'message': 'User login'}
      
      
class UserLogoutAccess(Resource):
    def post(self):
        return {'message': 'User logout'}
      
      
class UserLogoutRefresh(Resource):
    def post(self):
        return {'message': 'User logout'}
      
      
class TokenRefresh(Resource):
    def post(self):
        return {'message': 'Token refresh'}
      
      
class AllUsers(Resource):
    def get(self):
        return {'message': 'List of users'}

    def delete(self):
        return {'message': 'Delete all users'}
      
      
class SecretResource(Resource):
    def get(self):
        return {
            'answer': 42
        }