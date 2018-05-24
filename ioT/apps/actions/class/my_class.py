#!/usr/bin/python
# -*- coding: utf-8 -*-

import serial

class Connect():

    connect = None
    def __init__(self, port):
        self.__connect = serial.Serial(port,9600)

    def getData(self):
        try:
            data = self.__connect.readline().decode("utf-8").strip()
            return data

        except serial.SerialException as e:
            print("error read data", e.strerror)


    def setData(self, mesage):
        try:
            data = bytes(mesage,"utf-8")
            self.__connect.write(data)
        except serial.SerialException as e:
            print("error write data ",e.strerror)


    @staticmethod
    def getInstance(port):

        if Connect.connect == None:
            Connect.connect = Connect(port)

        return Connect.connect


class Information():

    def __init__(self):
        self.__data = None
        self.__serial = Connect.getInstance("/dev/ttyACM0")

    def __getData(self):
        return self.__serial.getData()

    data = property(fget=__getData)

