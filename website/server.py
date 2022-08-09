import paho.mqtt.client as mqtt
import time 
from . import db 
import json
from website.models import Prescripion

class RobotServer:
    received_message = 0
    main_topic = "topic/hospital"
    second_topic = "topic/status"
    status_topic = "topic/battery"
    mqtt_server = "test.mosquitto.org"
    port = 1883
    client = mqtt.Client()
    def on_connect(self,client, userdata, flags, rc):
        print("Connected with data code "+str(rc))
        print("Standby")
        client.subscribe(self.second_topic)

    def on_message(self,client, userdata, msg):
        global received_message
        received_message = msg.payload.decode()
        client.disconnect()

    def awaiting_message(self):
        self.client.connect(self.mqtt_server,self.port)
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.loop_forever()
        self.client.disconnect()
    def publish_message(self,message):
  
        self.client.connect(self.mqtt_server,self.port)
        self.client.publish(self.main_topic, message)
        self.client.disconnect()

    def send_message(self, data):
        self.publish_message(data)
        self.awaiting_message()
        if received_message == "Done":
            print("Send prescription data successfully")
        time.sleep(2)

    def recieve_status(self):
        self.awaiting_message()
        print(received_message)


class WebsiteServer:
    def add_prescription(self, data):
        numberPatient = int(data["patient_number"])
        roomPatient = int(data["room"])
        pre = Prescripion(
            doctor_name = data["doctor_name"],
            room_number = roomPatient,
            patient_number = numberPatient,
            medicine_list = json.dumps(data["medicine_list"]),
            amount_list = json.dumps(data["amount_list"]),
            delivery_time = json.dumps(data["delivery_time"])
        )
        db.session.add(pre)
        db.session.commit()


class StorageServer: 
    pass






