from connectionMQTT import ConnectionMQTT
import signal, time

from location import  Ambient, AmbientGeneral

"""

def hello():
    print("hollaaaa")

conection = ConnectionMQTT.getInstance()
conection.addSubscribe('gato', hello )
time.sleep(4)
conection.addSubscribe('pro', hello )
print('carajo')
signal.pause()
"""
listAmbients = []
ambientGeneral = []

amb1 = Ambient()
amb1.addDoor(4, 90, -90, 'pepito2/Cookings/0/door/value')
amb1.addLight(3, 'pepito2/Cookings/0/light/value')

amb2 = Ambient()
amb2.addDoor(5, 0, 90, 'pepito2/Bathrooms/0/door/value')
amb2.addLight(6, 'pepito2/Bathrooms/0/light/value')

amb3 = Ambient()
amb3.addDoor(7, 0, 90, 'pepito2/Rooms/0/door/value')
amb3.addLight(8, 'pepito2/Rooms/0/light/value')

amb4 = Ambient()
amb4.addDoor(9, 0, 90, 'pepito2/Rooms/1/door/value')
amb4.addLight(10, 'pepito2/Rooms/1/light/value')


listAmbients.append(amb1)
listAmbients.append(amb2)
listAmbients.append(amb3)
listAmbients.append(amb4)

signal.pause()
