from app import db
from app.models import User, Building, School, Symptom, Report

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

def make_buildings():
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


def make_users():
	users = {
		"Dhanvee Ivaturi": "dhanvee@umd.edu",
		"Henry Trinh": "dhanvee@umd.edu",
		"Nikolay Pomytkin": "dhanvee@umd.edu",
		"Ryan Mao": "dhanvee@umd.edu",
	}

    for name, email in users.items():
        u = User(name = name, email = email, password = User.generate_hash('password'))
        db.session.add(u)
        db.session.commit()