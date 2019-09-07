from flask_restful import Resource, reqparse
from app import api
from .models import User
from app import db
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)


report_parser = reqparse.RequestParser()
report_parser.add_argument('severity', help = 'This field cannot be blank', required = True)
report_parser.add_argument('campus_hotspots', help = 'This field cannot be blank', required = True)
report_parser.add_argument('recent_symptoms', help = 'This field cannot be blank', required = True)

class SubmitReport(Resource):
    def post(self):
        data = report_parser.parse_args()

        
        
class HotspotSymptomsData(Resource):
    def get(self):
        return "test"

class ChartsData(Resource):
    def get(self):
        return "test"

auth_parser = reqparse.RequestParser()
auth_parser.add_argument('username', help = 'This field cannot be blank', required = True)
auth_parser.add_argument('password', help = 'This field cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        data = auth_parser.parse_args()
        new_user = User(username = data['username'], password = User.generate_hash(data['password']))

        if User.find_by_username(data['username']):
            return {'message': 'User {} already exists'. format(data['username'])}
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {
                'message': 'User has been registered: {}'.format(new_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        except:
            return {
                'message': 'Error while attempting to register user.'
            }, 500


class UserLogin(Resource):
    def post(self):
        data = auth_parser.parse_args()
        current_user = User.find_by_username(data['username'])

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['username'])}
        
        if User.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {
                'message': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token
                }
        else:
            return {'message': 'Wrong credentials'}
      
      
class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500
      
      
class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500
      
      
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}
      
      




'''
These api resources are just for testing purposes, probably shouldn't/won't be used by the front-end
'''    
class AllUsers(Resource):
    def get(self):
        return_dict = {}
        for u in User.query.all():
            return_dict[u.username] = u.password
        return return_dict  
      
class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }