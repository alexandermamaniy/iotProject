#!/usr/bin/python3.5
# coding: utf-8

from decouple import config
import simplejson as json


def openData():
    with open(config('pathData'), 'r', encoding='utf-8') as file:
        structura = json.load(file)
    return structura

def saveData(struc):
    with open(config('pathData'), 'w', encoding='utf-8') as file:
        file.write(json.dumps(struc, sort_keys=True, indent=4*' '))



def setData(path, value):
    struc = openData()
    path = path.split('/')
    ref = struc
    for i in range(len(path)-1):
        ref = ref[int(path[i])] if len(path[i]) == 1 else ref[path[i]]
    ref[path[-1]] = value
    saveData(struc)

def getData(path):
    struc = openData()
    path = path.split('/')
    ref = struc
    for i in range(len(path) - 1):
        ref = ref[int(path[i])] if len(path[i]) == 1 else ref[path[i]]
    return ref[path[-1]]


#setData('pepito2/Sensors/dht11/humidyty', 10)
#print(getData('pepito2/Sensors/dht11/humidyty'))