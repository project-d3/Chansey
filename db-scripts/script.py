from app import db
from app.models import User, Building, School, Symptom, Report
import json

#==================================================================================

def make_schools():
    schools = [
        "University of California, Los Angeles",
        "University of Maryland, College Park",
        "University of Pennsylvania"
    ]

    for school in schools:
        s = School(name=school)
        db.session.add(s)
        db.session.commit()

#==================================================================================

def make_buildings():

    for file in ["UMDBuildings.json", "UCLABuildings.json", "UPennBuildings.json"]:
        with open(file) as json_source:
            data = json.loads(json_source.read())
        
        school_id = School.query.filter_by(name=data['school']).first().id

        for building in data['buildings']:
            b = Building(name=building, school_id=school_id)
            db.session.add(b)
            db.session.commit()


#==================================================================================

def make_users():
	users = {
		"Dhanvee Ivaturi": "dhanvee@umd.edu",
		"Henry Trinh": "dhanvee@umd.edu",
		"Nikolay Pomytkin": "pomytkin@umd.edu",
		"Ryan Mao": "dhanvee@umd.edu",
        "User One": "user1@test.com"
        "User Two": "user2test.com"
        "User Three": "user3@test.com"
        "User Four": "user4@test.com"
        "User Five": "user5@test.com"
	}

    for name, email in users.items():
        u = User(name = name, email = email, password = User.generate_hash('password'))
        db.session.add(u)
        db.session.commit()