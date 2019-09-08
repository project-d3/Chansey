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
        "Henry Trinh":
            ("thenry3@g.ucla.edu", 1, ["Sproul Hall","Engineering VI","Geology Building","Dodd Hall","Botany Building"]),
        "Ryan Mao":
            ("rym15@scarletmail.rutgers.edu", 3, ["The Quadrangle","The Radian","George A.  Weiss Pavilion","Jon M. Huntsman Hall","Claudia Cohen Hall"]),
        "Nikolay Pomytkin":
            ("pomytkin@umd.edu", 2, ["Oakland Hall","251 North","Jeong H. Kim Engineering Building","Computer Science Instructional Center","Prince Frederick Hall"]),
        "Dhanvee Ivaturi":
            ("dhanvee@umd.edu", 2, ["Oakland Hall","251 North","Brendan Iribe Center","Denton Hall","Wicomico Hall"]),
        "User One":
            ("user1@test.com", 2, ["Denton Hall","251 North","Adele H. Stamp Student Union","Brendan Iribe Center","A. V. Williams Building"]),
        "User Two":
            ("user2test.com", 2, ["Denton Hall","The North Diner","Brendan Iribe Center","Adele H. Stamp Student Union","Xfinity Center"]),
        "User Three":
            ("user3@test.com", 2, ["Cumberland Hall","The North Diner","Adele H. Stamp Student Union","Edward St. John Building","Denton Hall"]),
        "User Four":
            ("user4@test.com", 2, ["Cumberland Hall","The South Diner","Adele H. Stamp Student Union","Edward St. John Building","Denton Hall"]),
        "User Five":
            ("user5@test.com", 2, ["Wicomico Hall","The South Diner","Adele H. Stamp Student Union","Denton Hall","Edward St. John Building"]),
    }

    for name, email in users.items():
        u = User(name = name, email = email[0], password = User.generate_hash('password'), school_id=email[1])

        for bldg in email[2]:
            for b in Building.query.filter_by(name=bldg):
                u.buildings.append(b)

        db.session.add(u)
        db.session.commit()

#==================================================================================

def make_reports():
    s = 2
    # 7 Days ago
    days = 7
    new_report = Report(severity=severity, user_id=user_id, school_id=s, date=days)
    
    # 6 Days ago
    days = 6
    
    # 5 Days ago
    days = 5
    
    # 4 Days ago
    days = 4
    
    # 3 Days ago
    days = 3
    
    # 2 Days ago
    days = 2
    
    # 1 Days ago
    days = 1