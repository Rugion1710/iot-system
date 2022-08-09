import email
from ipaddress import ip_address
from sqlalchemy import ForeignKey
from . import db 
from datetime import datetime
from flask_login import UserMixin



class Prescripion(db.Model):
    __tablename__ = 'prescription_record'
    id = db.Column(db.Integer, primary_key=True)
    doctor_name = db.Column(db.String(200), nullable = False)
    room_number = db.Column(db.Integer, ForeignKey("room_hospital.id"))
    patient_number = db.Column(db.Integer, nullable = False)
    medicine_list = db.Column(db.String(1000), nullable = False)
    amount_list = db.Column(db.String(200), nullable = False)
    delivery_time = db.Column(db.String(200), nullable = False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    def __repr__(self):
        return f"{self.doctor_name} has added a prescription at {self.date_created}"

class Room(db.Model):
    __tablename__ = "room_hospital"
    id = db.Column(db.Integer, primary_key = True)
    number = db.Column(db.Integer, nullable = False)
    patient = db.relationship("Patient")
    def __repr__(self):
        return f"Room number {self.number}, with patient {self.patient}"

class Patient(db.Model, UserMixin):
    __tablename__ = "patient_hospital"
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(200), nullable = False)
    last_name = db.Column(db.String(200), nullable = False)
    email = db.Column(db.String(200), unique = True)
    password = db.Column(db.String(150), nullable = False)
    disease = db.Column(db.Text(), nullable = False)
    room_number = db.Column(db.Integer, ForeignKey("room_hospital.id"))
    number = db.Column(db.Integer, nullable = False)
    def __repr__(self):
        return f"Patient: {self.last_name} {self.first_name} \nEmail: {self.email}\nPassword: {self.password}\nDisease: {self.disease}\nRoom number: {self.room_number}\n Patient number: {self.number} "


class Medicine(db.Model):
    __tablename__ = "medicine_hospital"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable = False)
    description = db.Column(db.Text(), nullable = False)
    stored_number = db.Column(db.Integer, nullable = False)
    def __repr__(self):
        return f"Medicine name: {self.name}"

class Robot(db.Model):
    __tablename__ = "robot_hospital"
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), nullable=True)
    ip_address = db.Column(db.String(200), nullable = False)
    mac_address = db.Column(db.String(200), nullable = False)
    def __repr__(self):
        robot_name = self.name
        if self.name == "":
            robot_name = "Unknown robot"
        return f"{robot_name}:\n{self.ip_address}\n{self.mac_address}"





