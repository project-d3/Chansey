from flask_restful import Resource, reqparse
from app import api
from .models import User, Report, Symptom, Building, School
from app import db
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from datetime import datetime


''' 
START OF SECTION FOR CONSOLODATING POST REQUEST ARGUMENT PARSERS
'''
# parser for getting homepage data
home_data_parser = reqparse.RequestParser()
home_data_parser.add_argument('email', help = 'This field cannot be blank', required = True)

# parser for adding a new report
report_parser = reqparse.RequestParser()
report_parser.add_argument('severity', help = 'This field cannot be blank', required = True)
report_parser.add_argument('buildings', help = 'This field cannot be blank', required = True)
report_parser.add_argument('symptoms', help = 'This field cannot be blank', required = True)
report_parser.add_argument('email', help = 'This field cannot be blank', required = True)
report_parser.add_argument('date', help = 'This field cannot be blank', required = True)

# parser for authenticating
auth_parser = reqparse.RequestParser()
auth_parser.add_argument('email', help = 'This field cannot be blank', required = True)
auth_parser.add_argument('password', help = 'This field cannot be blank', required = True)

# parser for registration
registration_parser = reqparse.RequestParser()
registration_parser.add_argument('name', help = 'This field cannot be blank', required = True)
registration_parser.add_argument('email', help = 'This field cannot be blank', required = True)
registration_parser.add_argument('password', help = 'This field cannot be blank', required = True)

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

# parser for adding 
additional_info_parser = reqparse.RequestParser()
additional_info_parser.add_argument('email', help = 'This field cannot be blank', required = True)
additional_info_parser.add_argument('school', help = 'This field cannot be blank', required = True)
additional_info_parser.add_argument('buildings', help = 'This field cannot be blank', required = True)

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
        school_id = School.query.filter_by(name=data['school']).first().id

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
        # grabbing all raw data from request
        severity = data['severity']
        date = data['date'] # expected format for date: MM/DD/YYYY
        email = data['email']
        symptoms = data['symptoms']
        buildings = data['buildings']
        symptoms = symptoms.split(",")
        buildings = buildings.split(",")
        # converting raw data into variables to instantiate Report
        user = User.query.filter_by(email=email).first()
        if not user:
            return {
                'message': 'Requested user for report not found in database.',
                'status': False
            }
        user_id = user.id
        school = user.school
        if not school:
            return {
                'message': 'Requested school for report not found in database.',
                'status': False
            }
        school = school.id
        date = datetime.strptime(date, "%m/%d/%Y").date()
        # instantiate report from variables
        new_report = Report(severity=severity, user_id=user_id, school_id=school, date=date)

        # adding linked symptoms and buildings through for loop
        new_report.symptoms = []
        new_report.buildings = []
        for symptom in symptoms:
            new_report.symptoms.append(Symptom.query.filter_by(name=symptom).first())
        for building in buildings:
            new_report.buildings.append(Building.query.filter_by(name=building).first())
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
        data = home_data_parser.parse_args()
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return {
                'message': 'Failed to get data for incorrect user.',
                'status': False
            }
        school = user.school.name
        symptoms = {}
        buildings = {}
        for report in Report.query.filter_by(school_id = user.school_id).all():
            for symptom in report.symptoms:
                if symptoms.has_key(symptom.name):
                    symptoms[symptom.name] += 1
                else:
                    symptoms[symptom.name] = 1
            for buildings in report.buildings:
                if symptoms.has_key(symptom.name):
                    symptoms[symptom.name] += 1
                else:
                    symptoms[symptom.name] = 1

        return {
            'school': school,
            'symptoms': symptoms,
            'buildings': buildings
        }

class SchoolChartsData(Resource):
    def get(self):
        return "test"

class UserChartsData(Resource):
    def get(self):
        return "test"



'''
START OF SECTION FOR USER AUTHENTICATION LOGIC
'''
class UserAdditionalInformation(Resource):
    def get(self):
        return_dict = {}
        schools = School.query.all()
        for s in schools:
            return_dict[s.name] = [b.name for b in s.buildings]
        return return_dict
    
    def post(self):
        data = additional_info_parser()
        return "test"

class UserRegistration(Resource):
    def post(self):
        data = registration_parser.parse_args()
        new_user = User(name = data['name'], email = data['email'], password = User.generate_hash(data['password']))

        if User.find_by_email(data['email']):
            return {
                'message': 'User {} already exists'. format(data['email']),
                'status': False
            }
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            return {
                'message': 'User has been registered: {}'.format(new_user.email),
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
        current_user = User.find_by_email(data['email'])

        if not current_user:
            return {
                'message': 'User {} doesn\'t exist'.format(data['email']),
                'status': False
            }
        
        if User.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            return {
                'message': 'Logged in as {}'.format(current_user.email),
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
      