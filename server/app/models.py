from flask import Flask
from app import db
from passlib.hash import pbkdf2_sha256 as sha256

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username = username).first()

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)


class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))
    
    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)

'''
CORE API DATABASE TABLES

REPORT: Each time a user reports a set of symptoms

SYMPTOM: 1 record for every symptom type

BUILDING: 1 record for every building at every school


'''


class Report(db.Model):
    ___tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key = True)
    severity = db.Column(db.Integer)
    date = db.Column(db.Date)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    symptoms = db.relationship('Symptom', secondary = 'symptomreportlink')
    buildings = db.relationship('Building', secondary = 'buildingreportlink')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Symptom(db.Model):
    __tablename__ = 'symptoms'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique=True)
    reports = db.relationship('Report', backref='symptom', lazy='dynamic')

class School(db.Model):
    __tablename__ = 'schools'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique=True)
    users = db.relationship('User', backref='school', lazy='dynamic')
    reports = db.relationship('Report', backref='school', lazy='dynamic')
    buildings = db.relationship('Building', backref='school', lazy='dynamic')


class Building(db.Model):
    __tablename__ = 'buildings'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    reports = db.relationship('Report', secondary='buildingreportlink')


# These tables are for many-to-many relationships
class Symptomreportlink(db.Model):
    __tablename__ = 'symptomreportlink'
    symptom_id = db.Column(db.Integer, db.ForeignKey('symptom.id'), primary_key = True)
    report_id = db.Column(db.Integer, db.ForeignKey('report.id'), primary_key = True)

class Buildingreportlink(db.Model):
    __tablename__ = 'buildingreportlink'
    building_id = db.Column(db.Integer, db.ForeignKey('symptom.id'), primary_key = True)
    report_id = db.Column(db.Integer, db.ForeignKey('report.id'), primary_key = True)
