#!/usr/bin/python3.5
# coding: utf-8


from home import Home
from location import Led, LedConnection, Door, DoorConnection, Ambient, AmbientGeneral
from sensors import DHT11, PIR, MQ135, Fan, Ldr, BuzzerSensor
from decouple import config
import json, signal


def loadExtras():

    global structura, home
    keyUser = "".join(structura.keys())
    keyLocation = 'Extras'
    i = 0
    for extra in structura[keyUser][keyLocation]:
        for key, pin in extra.items():
            pin = structura[keyUser][keyLocation][i][key]['pin']
            if key == 'fan':
                classE = Fan(pin)

            elif key == 'alertSteal':
                classE = Led(pin)

            elif key == 'lightYard':
                classE = Led(pin)

            elif key == 'ldr':
                lightYard = home.getExtra('lightYard')
                classE = Ldr(lightYard)

            elif key == 'buzzer':
                classE = BuzzerSensor(pin)

            home.addExtra(key, classE)
        i+=1


if __name__ == "__main__":

    with open(config('pathData'), 'r') as file:
        structura = json.load(file)
    file.close()

    USERS = 'users'

    home = Home()
    loadExtras()
    for keyUser, valueUser in structura.items():
        # user
        for keyLocation, valueLocation in valueUser.items():
            if keyLocation == 'Sensors':
                for keySensor, valueSensor in valueLocation.items():
                    if keySensor == 'dht11':
                        pathHumidity = "{}/{}/{}/{}/humidity".format(USERS,keyUser,keyLocation,keySensor)
                        pathTemperature = "{}/{}/{}/{}/temperature".format(USERS, keyUser,keyLocation,keySensor)
                        pin = structura[keyUser][keyLocation][keySensor]['pin']
                        fan = home.getExtra('fan')
                        dht11 = DHT11(pin,pathTemperature,pathHumidity,fan)
                        home.addSensors(keySensor, dht11)

                    elif keySensor == 'mq135':
                        pathGas = "{}/{}/{}/{}/gas".format(USERS,keyUser,keyLocation,keySensor)
                        buzzer = home.getExtra('buzzer')
                        alertSteal = home.getExtra('alertSteal')
                        mq135 = MQ135(pathGas, buzzer, alertSteal)
                        home.addSensors(keySensor, mq135)

                    elif keySensor == 'pir':
                        pathIsActive = "{}/{}/{}/{}/isActive".format(USERS, keyUser, keyLocation, keySensor)
                        pathSteal = "{}/{}/{}/{}/steal".format(USERS, keyUser, keyLocation, keySensor)
                        pin = structura[keyUser][keyLocation][keySensor]['pin']
                        buzzer = home.getExtra('buzzer')
                        alertSteal = home.getExtra('alertSteal')
                        pir = PIR(pin, pathSteal, pathIsActive, buzzer, alertSteal)
                        home.addSensors(keySensor, pir)

            elif keyLocation == 'General':
                general = AmbientGeneral()

                for keyGeneral, valueGeneral in valueLocation.items():
                    pin = structura[keyUser][keyLocation][keyGeneral]['pin']
                    path = "{}/{}/{}/{}".format( USERS, keyUser, keyLocation, keyGeneral )

                    if keyGeneral == 'frontDoor':
                        minAngle = structura[keyUser][keyLocation][keyGeneral]['min_angle']
                        maxAngle = structura[keyUser][keyLocation][keyGeneral]['max_angle']
                        general.addFrontDoor(pin, minAngle, maxAngle, path)

                    elif keyGeneral == 'garageDoor':
                        minAngle = structura[keyUser][keyLocation][keyGeneral]['min_angle']
                        maxAngle = structura[keyUser][keyLocation][keyGeneral]['max_angle']
                        general.addGarageDoor(pin, minAngle, maxAngle, path)

                    elif keyGeneral == 'lightCorridor':
                        general.addLightCorridor(pin, path)

                home.setGeneral(general)

            elif keyLocation == 'Extras':
                pass

            else:
                i = 0
                for location in valueLocation:
                    ambient = Ambient()
                    for k in location.keys():
                        path = "{}/{}/{}/{}/{}".format(USERS,keyUser,keyLocation,i,k)
                        pin = structura[keyUser][keyLocation][i][k]['pin']
                        if k == 'light':
                            ambient.addLight(pin, path)
                        elif k == 'door':
                            minAngle = structura[keyUser][keyLocation][i][k]['min_angle']
                            maxAngle = structura[keyUser][keyLocation][i][k]['max_angle']
                            ambient.addDoor(pin, minAngle, maxAngle, path)
                    home.addAmbient(keyLocation, ambient)
                    i += 1
    print("Start !!!!")
    signal.pause()
