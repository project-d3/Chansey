from app import app
from app import api
from flask import jsonify, render_template
from flask_restful import Resource
from .resources import *
import re


# @app.route('/')
# @app.route('/index')
# def index():
#     return render_template('index.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


# CORE API ENDPOINTS

api.add_resource(SubmitReport, '/submit_report')  # to submit a report

# to get a dictionary with data necessary for home page
api.add_resource(HotspotSymptomsData, '/get_home_data')
# to get a dictionary with all the charts necessary for the charts page
api.add_resource(SchoolChartsData, '/get_charts_data')
# to get a dictionary with all the charts necessary for the charts page
api.add_resource(UserChartsData, '/get_charts_data')

# adding new schools/buildings (and symptoms if necessary?)
api.add_resource(AddSchool, '/add_school')
api.add_resource(AddBuilding, '/add_building')
api.add_resource(AddSymptom, '/add_symptom')

# authentication endpoints
api.add_resource(UserRegistration, '/registration')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogoutAccess, '/logout/access')
api.add_resource(UserLogoutRefresh, '/logout/refresh')
api.add_resource(TokenRefresh, '/token/refresh')

# more_info
# api.add_resource()

# endpoints only for testing purposes
api.add_resource(AllUsers, '/users')
api.add_resource(SecretResource, '/secret')
