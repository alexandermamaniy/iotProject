import signal, time
from location import  Ambient, AmbientGeneral
from sensors import Fan, BuzzerSensor, Ldr, DHT11, MQ135, PIR
from location import Led


listAmbients = []
ambientGeneral = []

amb1 = Ambient()
amb1.addLight(3, 'pepito2/Cookings/0/light/value')
amb1.addDoor(4, 90, -90, 'pepito2/Cookings/0/door/value')


amb2 = Ambient()
amb2.addDoor(5, 0, 90, 'pepito2/Bathrooms/0/door/value')
amb2.addLight(6, 'pepito2/Bathrooms/0/light/value')

amb3 = Ambient()
amb3.addDoor(7, 0, 90, 'pepito2/Rooms/0/door/value')
amb3.addLight(12, 'pepito2/Rooms/0/light/value')

amb4 = Ambient()
amb4.addDoor(13, 0, 90, 'pepito2/Rooms/1/door/value')
amb4.addLight(14, 'pepito2/Rooms/1/light/value')


listAmbients.append(amb1)
listAmbients.append(amb2)
listAmbients.append(amb3)
listAmbients.append(amb4)


"""
10
9
11
8
"""

lightYard = Led(15)
alert = Led(16)


fan = Fan(17)
buzzer = BuzzerSensor(18)
ldr = Ldr(lightYard)
mq135 = MQ135('pepito2/Sensors/mq135/gas', buzzer, alert )
pir = PIR(19, 'pepito2/Sensors/pir/isActive', 'pepito2/Sensors/pir/steal', buzzer, alert)
#dht11 = DHT11(20, 'pepito2/Sensors/dht11/temperature', 'pepito2/Sensors/dht11/humedity', fan)


signal.pause()
