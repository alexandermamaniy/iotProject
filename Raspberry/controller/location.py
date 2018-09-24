#!/usr/bin/python3
# coding: utf-8

from gpiozero import LED, AngularServo
from connectionMQTT import ConnectionMQTT
from data import setData, getData




class Led(object):

    def __init__(self, numberPin):
        self.led = LED(numberPin)


    def value(self):
        return self.led.value

    def turnOff(self):
        self.led.off()

    def turnOn(self):
        self.led.on()


class LedConnection( Led ):

    def __init__(self, numberPin, topic):
        super().__init__(numberPin)
        self.connection = ConnectionMQTT.getInstance()
        self.connection.addSubscribe(topic, self.callback)
        self.topic = topic
        self.start()

    def value(self):
        return ( self.led.value, getData(self.topic), self.topic )

    def start(self):
        value = getData(self.topic)
        print(value)
        if value:
            self.turnOn()
        else:
            self.turnOff()
        print('valor',value)
        self.connection.addPublished(self.topic, value )

    def callback(self, topic, value):

        state = getData(topic)
        if value != state and isinstance(value, bool):
            if value:
                self.turnOn()
                setData(topic, value)
            else:
                self.turnOff()
                setData(topic, value)

            print('valor de ',self.value())


class Door(object):

    def __init__( self, numberPin, minAngle, maxAngle ):
        self.angularServo = AngularServo(numberPin)
        self.minAngle = minAngle
        self.maxAngle = maxAngle

    def value(self):
        return  self.angularServo.angle

    def openDoor(self):
        self.angularServo.angle = self.maxAngle

    def closeDoor(self):
        
        self.angularServo.angle = self.minAngle


class DoorConnection( Door ):

    def __init__(self, numberPin, minAngle, maxAngle, topic ):
        super().__init__(numberPin, minAngle, maxAngle)
        self.connection = ConnectionMQTT.getInstance()
        self.connection.addSubscribe(topic, self.callback)
        self.topic = topic
        self.start()

    def start(self):
        value = getData(self.topic)
        if value == self.minAngle:
            self.closeDoor()
        else:
            self.openDoor()
        self.connection.addPublished(self.topic, value)


    def value(self):
        angle = self.angularServo.angle
        return (angle, getData(self.topic), self.topic)


    def callback(self, topic, value):
        state = getData(topic)
        if value != state and isinstance(value, int):
            if value == self.minAngle:
                self.closeDoor()
                setData(topic, value)
            elif value == self.maxAngle:
                self.openDoor()
                setData(topic, value)


class Ambient(object):

    def addLight(self,numberPin, topic ):
        self.light = LedConnection(numberPin,topic)

    def addDoor(self, numberPin, minAngle , maxAngle, topic ):
        self.door = DoorConnection(numberPin,minAngle,maxAngle,topic)


class AmbientGeneral(object):

    def addLightCorridor(self, numberPin, topic):
        self.lightCorridor = LedConnection(numberPin,topic)


    def addFrontDoor(self, numberPin, minAngle, maxAngle, topic ):
        self.frontDoor = DoorConnection(numberPin, minAngle, maxAngle, topic)


    def addGarageDoor(self, numberPin, minAngle, maxAngle, topic ):
        self.garageDoor = DoorConnection(numberPin, minAngle, maxAngle, topic)


