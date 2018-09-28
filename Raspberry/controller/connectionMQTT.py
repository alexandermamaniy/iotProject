#!/usr/bin/python3.5
# coding: utf-8

import paho.mqtt.client as mqtt
import threading
from decouple import config



class ConnectionMQTT():
    connection = None

    def __init__(self):
        self.callbacks = {}
        self.client = mqtt.Client()
        self.client.on_message = self.__on_message
        self.client.on_connect = self.__on_connect
        self.client.on_publish = self.__on_publish
        self.client.on_subscribe = self.__on_subscribe
        self.client.connect(config('serverMQTT'), 1883, 60)
        self.client.loop_start()


    def __on_connect(self, client, userdata, flags, rc):
        """"
        0: Connection successful
        1: Connectionrefused - incorrect protocol version
        2: Connection refused - invalid client identifier
        3: Connection refused - server unavailable
        4: Connection refused - bad username or password
        5: Connection refused - not authorised
        6 - 255: Currently unused.
        """
        if not rc :
            print('Connection successful', userdata, flags)
        else :
            print('error en la conecction')

    def __on_message(self, client, userdata, message):
        print(message.topic + " " + str(message.qos) + " " + str(message.payload))

        value = message.payload.decode("utf-8")
        #value = str(message.payload.decode("utf-8"))
        try:

            if value.lower() == 'true':
                value = True
            elif value.lower() == 'false':
                value = False
            elif int(value) or int(value)==0 :
                value = int(value)
        except ValueError:
            pass
        #print("este es el type",type(value))

        self.callbacks[message.topic](message.topic, value)


    def __on_publish(self, client, userdata, mid):
        '''
        mid: id de subcriptcion
        '''
        # cuando publicamos
        #print("mid: " + str(mid), userdata)

    def __on_subscribe(self, client, userdata, mid, granted_qos):
        print("Subscribed: " + str(mid) + " " + str(granted_qos))


    def __on_log(self, mqttc, obj, level, string):
        print('log: ',string)

    def addSubscribe(self, topic, callback):

        self.callbacks[topic] = callback
        self.client.subscribe(topic, 0)


    def addPublished(self, topic, message):
        infot = self.client.publish(topic, message, qos=2)
        infot.wait_for_publish()

    @staticmethod
    def getInstance():

        if ConnectionMQTT.connection == None:
            ConnectionMQTT.connection = ConnectionMQTT()

        return ConnectionMQTT.connection
