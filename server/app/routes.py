from app import app
from app import api
from flask import jsonify, render_template
from flask_restful import Resource
from .resources import *
import re

@app.route('/')
@app.route('/signin')
@app.route('/signup1')
@app.route('/home')
@app.route('/signup2')
@app.route('/symptomform')
def index():
    return render_template('index.html')


# CORE API ENDPOINTS

api.add_resource(SubmitReport, '/api/submit_report')  # to submit a report

# to get a dictionary with data necessary for home page
api.add_resource(HotspotSymptomsData, '/api/get_home_data')
# to get a dictionary with all the charts necessary for the charts page
api.add_resource(SchoolChartsData, '/api/get_charts_data')
# to get a dictionary with all the charts necessary for the charts page
api.add_resource(UserChartsData, '/api/get_charts_data')

# adding new schools or buildings (and symptoms if necessary?)
api.add_resource(AddSchool, '/api/add_school')
api.add_resource(AddBuilding, '/api/add_building')
api.add_resource(AddSymptom, '/api/add_symptom')

# authentication endpoints
api.add_resource(UserRegistration, '/api/registration')
api.add_resource(UserLogin, '/api/login')
api.add_resource(UserLogoutAccess, '/api/logout/access')
api.add_resource(UserLogoutRefresh, '/api/logout/refresh')
api.add_resource(TokenRefresh, '/api/token/refresh')
api.add_resource(UserAdditionalInformation, '/api/additional_info_form')
