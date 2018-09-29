#!/usr/bin/python3.5
# coding: utf-8


from home import Home
from location import Led, LedConnection, Door, DoorConnection, Ambient, AmbientGeneral
from sensors import DHT11, PIR, MQ135, Fan, Ldr, BuzzerSensor
from decouple import config
import json, signal


def loadExtras():

    global structura, home
    #keyUser = "".join(structura.keys())
    keyUser = structura['user']
    keyLocation = 'Extras'
    i = 0
    for keyExtra, valueExtra  in structura[keyLocation].items():
        pin = structura[keyLocation][keyExtra]['pin']
        if keyExtra == 'fan':
            classE = Fan(pin)

        elif keyExtra == 'alertSteal':
            classE = Led(pin)

        elif keyExtra == 'lightYard':
            classE = Led(pin)

        elif keyExtra == 'ldr':
            lightYard = home.getExtra('lightYard')
            classE = Ldr(lightYard)

        elif keyExtra == 'buzzer':
            classE = BuzzerSensor(pin)

        home.addExtra(keyExtra, classE)


if __name__ == "__main__":

    with open(config('pathData'), 'r') as file:
        structura = json.load(file)
    file.close()

    home = Home()
    loadExtras()
    keyUser = structura['user']

    for keyLocation, valueLocation in structura.items():
        if keyLocation == 'Sensors':
            for keySensor, valueSensor in valueLocation.items():
                if keySensor == 'dht11':
                    pathHumidity = "{}/{}/{}/humidity".format(keyUser,keyLocation,keySensor)
                    pathTemperature = "{}/{}/{}/temperature".format(keyUser,keyLocation,keySensor)
                    pin = structura[keyLocation][keySensor]['pin']
                    fan = home.getExtra('fan')
                    dht11 = DHT11(pin,pathTemperature,pathHumidity,fan)
                    home.addSensors(keySensor, dht11)

                elif keySensor == 'mq135':
                    pathGas = "{}/{}/{}/gas".format(keyUser,keyLocation,keySensor)
                    buzzer = home.getExtra('buzzer')
                    alertSteal = home.getExtra('alertSteal')
                    mq135 = MQ135(pathGas, buzzer, alertSteal)
                    home.addSensors(keySensor, mq135)

                elif keySensor == 'pir':
                    pathIsActive = "{}/{}/{}/isActive".format(keyUser, keyLocation, keySensor)
                    pathSteal = "{}/{}/{}/steal".format(keyUser, keyLocation, keySensor)
                    pin = structura[keyLocation][keySensor]['pin']
                    buzzer = home.getExtra('buzzer')
                    alertSteal = home.getExtra('alertSteal')
                    pir = PIR(pin, pathSteal, pathIsActive, buzzer, alertSteal)
                    home.addSensors(keySensor, pir)

        elif keyLocation == 'General':
            general = AmbientGeneral()

            for keyGeneral, valueGeneral in valueLocation.items():
                pin = structura[keyLocation][keyGeneral]['pin']
                path = "{}/{}/{}/value".format(keyUser, keyLocation, keyGeneral )

                if keyGeneral == 'frontDoor':
                    minAngle = structura[keyLocation][keyGeneral]['min_angle']
                    maxAngle = structura[keyLocation][keyGeneral]['max_angle']
                    general.addFrontDoor(pin, minAngle, maxAngle, path)

                elif keyGeneral == 'garageDoor':
                    minAngle = structura[keyLocation][keyGeneral]['min_angle']
                    maxAngle = structura[keyLocation][keyGeneral]['max_angle']
                    general.addGarageDoor(pin, minAngle, maxAngle, path)

                elif keyGeneral == 'lightCorridor':
                    general.addLightCorridor(pin, path)

            home.setGeneral(general)

        elif keyLocation == 'Bathrooms' or keyLocation == 'Cookings' or keyLocation == 'LivingRooms' or keyLocation == 'Rooms':
            i = 0
            for location in valueLocation:
                ambient = Ambient()
                print("este es el erro",location)
                for k in location.keys():
                    path = "{}/{}/{}/{}/value".format(keyUser,keyLocation,i,k)
                    pin = structura[keyLocation][i][k]['pin']
                    print('estamos imprimiendo',type(path), type(pin))
                    if k == 'light':
                        ambient.addLight(pin, path)
                    elif k == 'door':
                        minAngle = structura[keyLocation][i][k]['min_angle']
                        maxAngle = structura[keyLocation][i][k]['max_angle']
                        ambient.addDoor(pin, minAngle, maxAngle, path)
                home.addAmbient(keyLocation, ambient)
                i += 1
    print("Start !!!!")
    signal.pause()
