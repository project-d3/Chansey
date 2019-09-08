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
        "Dhanvee Ivaturi":  ("dhanvee@umd.edu", 2),
        "Henry Trinh":      ("thenry3@g.ucla.edu", 1),
        "Nikolay Pomytkin": ("pomytkin@umd.edu", 2),
        "Ryan Mao":         ("rym15@scarletmail.rutgers.edu", 3),
        "User One":         ("user1@test.com", 2),
        "User Two":         ("user2test.com", 2),
        "User Three":       ("user3@test.com", 2),
        "User Four":        ("user4@test.com", 2),
        "User Five":        ("user5@test.com", 2)
    }

    for name, email in users.items():
        u = User(name = name, email = email[0], password = User.generate_hash('password'), school_id=email[1])
        db.session.add(u)
        db.session.commit()

#==================================================================================

