from flask_restful import Resource, reqparse
from app import api
from .models import User
from app import db
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

''' 
START OF SECTION FOR CONSOLODATING POST REQUEST ARGUMENT PARSERS
'''

# parser for adding a new report
report_parser = reqparse.RequestParser()
report_parser.add_argument('severity', help = 'This field cannot be blank', required = True)
report_parser.add_argument('buildings', help = 'This field cannot be blank', required = True)
report_parser.add_argument('symptoms', help = 'This field cannot be blank', required = True)
report_parser.add_argument('user', help = 'This field cannot be blank', required = True)
report_parser.add_argument('school', help = 'This field cannot be blank', required = True)
report_parser.add_argument('date', help = 'This field cannot be blank', required = True)

# parser for authenticating
auth_parser = reqparse.RequestParser()
auth_parser.add_argument('username', help = 'This field cannot be blank', required = True)
auth_parser.add_argument('password', help = 'This field cannot be blank', required = True)

# parser for adding building
building_parser = reqparse.RequestParser()
building_parser.add_argument('name', help = 'This field cannot be blank', required = True)
building_parser.add_argument('school', help = 'This field cannot be blank', required = True)

# parser for adding school
school_parser = reqparse.RequestParser()
school_parser.add_argument('name', help = 'This field cannot be blank', required = True)

# parser for adding symptom
symptom_parser = reqparse.RequestParser()
symptom_parser.add_argument('name', help = 'This field cannot be blank', required = True)

'''
END OF ARG PARSER SECTION
'''

# adding new schools/buildings (and symptoms if necessary?)

class AddSchool(Resource):
    def post(self):
        data = school_parser.parse_args()
        new_school = School(name=data['name'])
        try:
            db.session.add(new_school)
            db.session.commit()
            return {
                'message': '{} school created successfully.'.format(new_school.name),
                'status': True
            }
        except:
            return {
                'message':'Error occurred during creation of school.',
                'status': False
            }

class AddBuilding(Resource):
    def post(self):
        data = building_parser.parse_args()
        school_id = School.query.filter_by(name=data['school']).first()

        if not school_id:
            return {
                'message': 'School not found in database.',
                'status': False
            }
        
        new_building = Building(name=data['name'], school_id=school_id)
        try:
            db.session.add(new_building)
            db.session.commit()
            return {
                'message': '{} building created successfully.'.format(new_building.name),
                'status': True
            }
        except:
            return {
                'message':'Error occurred during creation of building.',
                'status': False
            }

class AddSymptom(Resource):
    def post(self):
        data = symptom_parser.parse_args()
        new_symptom = Symptom(name=data['name'])
        try:
            db.session.add(new_symptom)
            db.session.commit()
            return {
                'message': 'Successfully added symptom {} to database.'.format(new_symptom.name),
                'status': True
            }
        except:
            return {
                'message': 'Failed to add symptom to database.',
                'status': False
            }


# post endpoint for submiting a new report
class SubmitReport(Resource):
    def post(self):
        data = report_parser.parse_args()

        date = data['date']
        school = data['school']
        user = data['user']
        symptoms = data['symptoms']
        buildings = data['buildings']

        new_report = Report()

        try:
            db.session.add(new_report)
            db.session.commit()
            return {
                'message': 'Successfully created report for user {}'.format(new_report.user.username),
                'status': True
            }
        except:
            return {
                'message': 'Failed to create new report.',
                'status': False
            }

        
# get endpoints to get data for different pages       
class HotspotSymptomsData(Resource):
    def get(self):
        return "test"

class SchoolChartsData(Resource):
    def get(self):
        return "test"

class UserChartsData(Resource):
    def get(self):
        return "test"



'''
START OF SECTION FOR 
'''
class UserRegistration(Resource):
    def post(self):
        data = auth_parser.parse_args()
        new_user = User(username = data['username'], password = User.generate_hash(data['password']))

        if User.find_by_username(data['username']):
            return {
                'message': 'User {} already exists'. format(data['username']),
                'status': False
            }
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {
                'message': 'User has been registered: {}'.format(new_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'status': True
            }
        except:
            return {
                'message': 'Error while attempting to register user.',
                'status': False
            }, 500


class UserLogin(Resource):
    def post(self):
        data = auth_parser.parse_args()
        current_user = User.find_by_username(data['username'])

        if not current_user:
            return {
                'message': 'User {} doesn\'t exist'.format(data['username']),
                'status': False
            }
        
        if User.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = data['username'])
            refresh_token = create_refresh_token(identity = data['username'])
            return {
                'message': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'status': True
            }
        else:
            return {
                'message': 'Wrong credentials',
                'status': False
            }
      
      
class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {
                'message': 'Access token has been revoked',
                'status': True
            }
        except:
            return {
                'message': 'Something went wrong',
                'status': False
            }, 500
      
      
class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {
                'message': 'Refresh token has been revoked',
                'status': True
            }
        except:
            return {
                'message': 'Something went wrong',
                'status': False
            }, 500
      
      
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {
            'access_token': access_token,
            'status': True
        }
      
      


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