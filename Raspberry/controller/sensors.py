#!/usr/bin/python3.5
# coding: utf-8

from connectionMQTT import ConnectionMQTT
from connectionMCP import ConnectionMCP
from gpiozero import MotionSensor, Buzzer, OutputDevice, LED
from threading import Thread
import Adafruit_DHT, glob
from time import sleep
import serial
from data import setData, getData


class Fan(object):

    def __init__(self, numberPin):
        self.relay = OutputDevice(numberPin)

    def value(self):
        return self.relay.value

    def fanOff(self):
        self.relay.off()

    def fanOn(self):
        self.relay.on()


class BuzzerSensor(object):
    def __init__(self, numberPin):
        self.buzzer = Buzzer(numberPin)

    def getBuzzer(self):
        return  self.buzzer

    def value(self):
        return self.buzzer.is_active

    def buzzerOff(self):
        self.buzzer.off()

    def buzzerOn(self):
        self.buzzer.on()


# implementar con el conversor
class Ldr(object):
    def __init__(self, lightYard):

        self.connectionMCP = ConnectionMCP.getInstance()

        self.lightYard = lightYard
        self.threadLDR = Thread(target=self.startLdr)
        self.threadLDR.setDaemon(True)
        self.threadLDR.start()

    def startLdr(self):

        """
                while True:
            value = self.connectionMCP.getLdr()
            if value > 3000:
                self.lightYard.turnOn()
                print('se prendio Luz LDR')
            else:
                self.lightYard.turnOff()
                print('se apago Luz LDR')
            sleep(0.5)
        """

        previousState = True if self.connectionMCP.getLdr() > 3000 else False
        while True:
            actualState = True if self.connectionMCP.getLdr() > 3000 else False
            if previousState != actualState:
                if actualState:
                    self.lightYard.turnOn()
                    print('se prendio Luz LDR')
                else:
                    self.lightYard.turnOff()
                    print('se apago Luz LDR')
            previousState = actualState
            sleep(0.5)


class DHT11(object):
    def __init__(self, numberPin, topicTemperature, topicHumidity, fan):

        self.connectionMQTT = ConnectionMQTT.getInstance()

        self.connectionMQTT.addSubscribe(topicHumidity, lambda a, b : print(a,b) )
        self.connectionMQTT.addSubscribe(topicTemperature, lambda a, b : print(a,b) )

        self.topicTem = topicTemperature
        self.topicHum = topicHumidity

        self.dht11 = Adafruit_DHT.DHT11
        self.pin = numberPin
        self.fan = fan

        self.threadDht11 = Thread(target=self.start)
        self.threadDht11.setDaemon(True)
        self.threadDht11.start()


    def value(self):
        humidity, temperature = Adafruit_DHT.read_retry(self.dht11, self.pin)

        valueHumidity = getData(self.topicHum)
        valueTemperature = getData(self.topicTem)

        topicHumidity = self.topicHum
        topicTemperature = self.topicTem

        return ( humidity, temperature, valueHumidity, valueTemperature, topicHumidity, topicTemperature )

    def start(self):

        while True:
            humidity, temperature = Adafruit_DHT.read_retry(self.dht11, self.pin)
            if humidity == None:
                humidity=0

            if temperature == None:
                temperature=0
            self.connectionMQTT.addPublished(self.topicTem, temperature)
            self.connectionMQTT.addPublished(self.topicHum, humidity)
            if temperature > 21:
                self.fan.fanOn()
                print('Se prendio Ventiladora')
            else:
                self.fan.fanOff()
                print('Se apago Ventiladora')
            sleep(0.5)

class MQ135(object):

    def __init__(self, topic,  buzzer, alertSteal):

        self.connectionMCP = ConnectionMCP.getInstance()
        self.connectionMQTT = ConnectionMQTT.getInstance()
        self.topic = topic
        self.value = False
        self.buzzer = buzzer
        self.alertSteal = alertSteal

        self.threadDht11 = Thread(target=self.startMQ135)
        self.threadDht11.setDaemon(True)
        self.threadDht11.start()

    def value(self):
        gas = self.connectionMCP.getMq135()
        return ( gas, self.topic)


    def startMQ135(self):
        previousState = self.connectionMCP.getMq135()
        while True:
            actualState = self.connectionMCP.getMq135()
            if previousState != actualState :
                if actualState > 1700 :
                    self.connectionMQTT.addPublished(self.topic,True)
                    self.buzzer.buzzerOn()
                    self.alertSteal.turnOn()
                    print("gas detected")
                else:
                    self.connectionMQTT.addPublished(self.topic,False)
                    self.buzzer.buzzerOff()
                    self.alertSteal.turnOff()
            previousState = actualState
            sleep(0.5)

class PIR(object):

    def __init__(self, numberPin, topicSteal, topicIsActive, buzzer, alertSteal):

        self.connectionMQTT = ConnectionMQTT.getInstance()

        self.topicSteal = topicSteal
        self.topicIsActive = topicIsActive
        self.connectionMQTT.addSubscribe(self.topicIsActive, self.callbackIsActive)
        self.connectionMQTT.addSubscribe(self.topicSteal, self.callbackSteal)
        self.buzzer = buzzer
        self.alertSteal = alertSteal

        self.pir = MotionSensor(numberPin)
        self.threadPir = Thread(target=self.startPir)
        self.threadPir.setDaemon(True)
        self.threadPir.start()



    def value(self):
        pir = self.pir.value

        isActive = getData(self.topicIsActive)
        steal = getData(self.topicSteal)

        return ( pir, isActive, steal, self.topicIsActive, self.topicSteal)


    def startPir(self):
        previousState = getData(self.topicSteal)

        while True:
            actualState = self.pir.motion_detected

            if actualState != previousState:
                if actualState and getData(self.topicIsActive):
                    self.connectionMQTT.addPublished(self.topicSteal, True)
                if not getData(self.topicIsActive):
                    self.connectionMQTT.addPublished(self.topicSteal, False)

            previousState = actualState
            sleep(0.2)

    def callbackIsActive(self, topic, value):

        if not value:
            self.buzzer.buzzerOff()
            self.alertSteal.turnOff()
        setData(topic, value)
        print(self.value())

    def callbackSteal(self, topic, value):
        if value:
            self.buzzer.buzzerOn()
            self.alertSteal.turnOn()
        else:
            self.buzzer.buzzerOff()
            self.alertSteal.turnOff()
        setData(topic, value)
        print(self.value())




"""
class Conexion(object):
    conexion = None

    def __init__(self):
        self.__conexion = serial.Serial( self.getPort() )
        self.gas = 0
        self.ldr = 0
        self.threadValues = Thread(target= self.updateValues)
        self.threadValues.setDaemon(True)
        self.threadValues.start()

    def getPort(self):
        # only for GNU-Linux    jajaj XD
        pattern = '/dev/ttyACM?'
        return "".join(glob.glob(pattern, recursive=False))


    def updateValues(self):
        while True:
            try:
                valor = self.__conexion.readline().decode("utf-8").strip().split('.')
                if len(valor) == 2:
                    self.gas = True if valor[0] == '1' else False
                    self.ldr = True if valor[1] == '1' else False

            except serial.SerialException or serial.SerialTimeoutException or Exception or ValueError as e:
                print("ocurrio una excepcion en la lectura Serial")
            sleep(0.2)
    @staticmethod
    def getInstance():

        if Conexion.conexion == None:
            Conexion.conexion = Conexion()

        return Conexion.conexion


"""