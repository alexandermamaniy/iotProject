#!/usr/bin/python3.5
# coding: utf-8

import json, copy
import firebase_admin
from decouple import config
from firebase_admin import db, credentials


#pathData = config('pathData')
#pathCred = config('pathCred')

with  open(config('pathData'),'r') as file:
    data = json.load(file)

file.close()

cred = credentials.Certificate(config('pathCred'))
firebase_admin.initialize_app(cred,{
    'databaseURL': config('urlFirebase')
})

ref = db.reference('users')

structura = copy.deepcopy(data)

for keyUser, valueUser in data.items():
    for keyLocation, valueLocation in valueUser.items():

        if keyLocation == 'Sensors':
            for keySensor, valueSensor in valueLocation.items():
                for keyAttrSensor, valueAttrSensor in valueSensor.items():
                    if keyAttrSensor == 'pin':
                        del structura[keyUser][keyLocation][keySensor][keyAttrSensor]
                    else:
                        structura[keyUser][keyLocation][keySensor][keyAttrSensor] = valueAttrSensor


        elif keyLocation == 'General':
            for keyGeneral, valueGeneral in valueLocation.items():
                structura[keyUser][keyLocation][keyGeneral] = False
        elif keyLocation == 'Extras':
            del structura[keyUser][keyLocation]
        else:
            i = 0
            for location in valueLocation:
                for k in location.keys():
                    structura[keyUser][keyLocation][i][k] = False
                i+=1

ref.update(structura)

