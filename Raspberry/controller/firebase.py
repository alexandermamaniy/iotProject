#!/usr/bin/python3.5
# coding: utf-8

import firebase_admin
from firebase_admin import credentials, db
from decouple import config
import json

class ConecctionFirebase():
    connection = None

    def __init__(self):
        pathCred = config('pathCred')
        pathData = config('pathData')
        cred = credentials.Certificate(pathCred)
        firebase_admin.initialize_app(cred, {
            'databaseURL': config('urlFirebase'),
        })
        with  open(pathData, 'r') as file:
            data = json.load(file)
        file.close()
        self.__db = db


    def getDb(self):
        return self.__db

    @staticmethod
    def getInstance():


        if ConecctionFirebase.connection == None:
            ConecctionFirebase.connection = ConecctionFirebase()

        return ConecctionFirebase.connection