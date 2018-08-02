#!/usr/bin/python3.5
# coding: utf-8

from firebase import ConecctionFirebase
from gpiozero import MotionSensor, Buzzer, OutputDevice, LED
from threading import Thread
import Adafruit_DHT, glob
from time import sleep
import serial, threading


connection = ConecctionFirebase.getInstance()



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


class Ldr(object):
    def __init__(self, lightYard):
        self.lightYard = lightYard
        self.conexion = Conexion.getInstance()

        self.threadLDR = threading.Thread(target=self.startLdr)
        self.threadLDR.setDaemon(True)
        self.threadLDR.start()



    def startLdr(self):

        while True:
            if self.conexion.ldr:
                self.lightYard.turnOff()
            else:
                self.lightYard.turnOn()
            sleep(0.2)


class DHT11(object):
    def __init__(self, numberPin, pathTemperature, pathHumidity, fan):
        self.connectionHumidity = connection.getDb().reference(pathHumidity)
        self.connectionTemperature = connection.getDb().reference(pathTemperature)
        self.dht11 = Adafruit_DHT.DHT11
        self.pin = numberPin
        self.fan = fan

        self.threadDht11 = Thread(target=self.startDht11)
        self.threadDht11.setDaemon(True)
        self.threadDht11.start()


    def value(self):
        humidity, temperature = Adafruit_DHT.read_retry(self.dht11, self.pin)

        connectionHumidity = self.connectionHumidity.get()
        connectionTemperature = self.connectionTemperature.get()

        pathHumidity = self.connectionHumidity.path
        pathTemperature = self.connectionTemperature.path

        return ( humidity, temperature, connectionHumidity, connectionTemperature, pathHumidity, pathTemperature )


    def startDht11(self):

        while True:
            humidity, temperature = Adafruit_DHT.read_retry(self.dht11, self.pin)
            if humidity == None:
                humidity=0

            if temperature == None:
                temperature=0


            self.connectionHumidity.set(humidity)
            self.connectionTemperature.set(temperature)
            if temperature > 21:
                self.fan.fanOn()
            else:
                self.fan.fanOff()
            sleep(0.2)


class MQ135(object):

    def __init__(self, path,  buzzer, alertSteal):
        self.conexion = Conexion.getInstance()

        self.connectionGas = connection.getDb().reference(path)
        self.value = False
        self.buzzer = buzzer
        self.alertSteal = alertSteal

        self.threadDht11 = Thread(target=self.startMQ135)
        self.threadDht11.setDaemon(True)
        self.threadDht11.start()

    def value(self):
        gas = self.conexion.gas

        connectionGas = self.connectionGas.get()
        pathGas = self.connectionGas.path

        return ( gas, connectionGas, pathGas )

    def startMQ135(self):
        previousState = self.conexion.gas
        while True:
            actualState = self.conexion.gas
            if previousState != actualState :
                if actualState :
                    self.connectionGas.set(True)
                    self.buzzer.buzzerOn()
                    self.alertSteal.turnOn()
                    print("gas detected")
                else:
                    self.connectionGas.set(False)
                    self.buzzer.buzzerOff()
                    self.alertSteal.turnOff()
            previousState = actualState
            sleep(0.2)


class PIR(object):

    def __init__(self, numberPin, pathSteal, pathIsactive, buzzer, alertSteal):
        self.connectionSteal = connection.getDb().reference(pathSteal)
        self.connectionIsActive = connection.getDb().reference(pathIsactive)
        self.buzzer = buzzer
        self.alertSteal = alertSteal

        self.pir = MotionSensor(numberPin)
        self.threadPir = Thread(target=self.startPir)
        self.threadPir.setDaemon(True)
        self.threadPir.start()



    def value(self):
        pir = self.pir.value

        connectionSteal = self.connectionSteal.get()
        connectionIsActive= self.connectionIsActive.get()

        pathSteal = self.connectionSteal.path
        pathIsActive = self.connectionIsActive.path

        return ( pir, connectionSteal, connectionIsActive, pathSteal, pathIsActive )


    def startPir(self):
        previousState = self.connectionSteal.get()

        while True:
            actualState = self.pir.motion_detected

            if actualState != previousState:
                if actualState and self.connectionIsActive.get():
                    self.connectionSteal.set(True)
                    self.buzzer.buzzerOn()
                    self.alertSteal.turnOn()
                    print(self.value())

                if not self.connectionIsActive.get():
                    self.connectionSteal.set(False)
                    self.buzzer.buzzerOff()
                    self.alertSteal.turnOff()

            previousState = actualState
            sleep(0.2)


class Conexion(object):
    conexion = None

    def __init__(self):
        self.__conexion = serial.Serial( self.getPort() )
        self.gas = 0
        self.ldr = 0
        self.threadValues = threading.Thread(target= self.updateValues)
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

