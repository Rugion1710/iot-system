from cgitb import html


from threading import main_thread
from flask import Blueprint, render_template, request, flash
import json
from numpy import number
from website.models import Prescripion, Patient
from collections import deque
from .server import RobotServer, WebsiteServer
from website.network import scan_network
import flask 

webserver = WebsiteServer()
botserver = RobotServer()


views = Blueprint("views", __name__)
@views.route('/')
def home():
    return render_template("home.html")
@views.route('/patient')
def patient():  
    return render_template("patient.html")
@views.route('/pre', methods=['GET', 'POST'])
def pre():
    return render_template("prescription.html")

@views.route('/post_prescription', methods=['POST'])
def post_prescription():
    output = request.get_json()
    result = json.loads(output)
    print(result)
    webserver.add_prescription(result)
    botserver.send_message(json.dumps(result))
    return result

@views.route('/medicine')
def medicine():
    return render_template("medicine.html")


@views.route('/pre/history')
def history():
    #generate history 
    all_prescription = Prescripion.query.all()
    all_medicine = []
    for i in all_prescription:
        all_medicine.append(json.loads(i.medicine_list))
    all_amount = []
    for i in all_prescription:
        all_amount.append(json.loads(i.amount_list))
    return render_template("history.html", data=all_prescription, medicine=all_medicine, amount=all_amount)


@views.route('/pre/processing')
def processing():
    return render_template("processing.html")

@views.route('/robot')
def robot():
    return render_template("robot.html")


@views.route('/users', methods = ["GET"])
def users():
    print("users endpoint reached...")
    with open("users.json", "r") as f:
        data = json.load(f)
        data.append({
            "username": "user4",
            "pets": ["hamster"] 
        })
        return flask.jsonify(data)

@views.route('/robot_data', methods=['GET'])
def robot_data():
    print('robot_data endpoint reached...')
    data = {
        "robot_name": scan_network(),
    }
    return flask.jsonify(data)

    