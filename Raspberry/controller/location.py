#!/usr/bin/python3
# coding: utf-8

from gpiozero import LED, AngularServo
from firebase import ConecctionFirebase
from time import sleep
from threading import Thread

connection = ConecctionFirebase.getInstance()


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

    def __init__(self, numberPin, path):

        super().__init__(numberPin)
        self.connection = connection.getDb().reference(path)
        self.thread = Thread(target=self.threadLed)
        self.thread.setDaemon(True)
        self.thread.start()

    def value(self):
        led = self.led.value
        connection = self.connection.get()
        path = self.connection.path
        return ( led, connection, path )

    def getConnection(self):
        return self.connection


    def threadLed(self):
        previousState = self.connection.get()

        if previousState :
            self.turnOn()
        else:
            self.turnOff()
        while True:
            actualState = self.connection.get()

            if actualState != previousState:
                if actualState:
                    self.turnOn()
                    print(self.value())
                else:
                    self.turnOff()
                    print(self.value())
                previousState = actualState
            sleep(0.4)


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

    def __init__(self, numberPin, minAngle, maxAngle, path ):
        super().__init__(numberPin, minAngle, maxAngle)
        self.connection = connection.getDb().reference(path)
        self.thread = Thread(target=self.threadDoor)
        self.thread.setDaemon(True)
        self.thread.start()

    def value(self):
        angle = self.angularServo.angle
        connection = self.connection.get()
        path = self.connection.path
        return ( angle, connection, path )

    def getConnection(self):
        return self.connection

    def threadDoor(self):
        previousState = self.connection.get()

        if previousState:
            self.openDoor()
        else:
            self.closeDoor()
        while True:
            actualState = self.connection.get()

            if actualState != previousState:
                if actualState:
                    self.openDoor()
                    print(self.value())
                else:
                    self.closeDoor()
                    print(self.value())
                previousState = actualState
            sleep(0.4)


class Ambient(object):

    def addLight(self,numberPin, path ):
        self.light = LedConnection(numberPin,path)

    def addDoor(self, numberPin, minAngle , maxAngle, path ):
        self.door = DoorConnection(numberPin,minAngle,maxAngle,path)


class AmbientGeneral(object):

    def addLightCorridor(self, numberPin, path):
        self.lightCorridor = LedConnection(numberPin,path)


    def addFrontDoor(self, numberPin, minAngle, maxAngle, path ):
        self.frontDoor = DoorConnection(numberPin, minAngle, maxAngle, path)


    def addGarageDoor(self, numberPin, minAngle, maxAngle, path ):
        self.garageDoor = DoorConnection(numberPin, minAngle, maxAngle, path)


