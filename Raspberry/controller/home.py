#/usr/bin/python3
# coding: utf-8



class Home(object):

    def __init__(self):
        self.bathrooms = []
        self.cookings = []
        self.rooms = []
        self.livingRooms = []
        self.sensors = {}
        self.general = None
        self.extras = {}

    def addAmbient(self, keyAmbient, ambient):
        if keyAmbient == 'Bathrooms':
            self.addBathroom(ambient)
        elif keyAmbient == 'Rooms':
            self.addRoom(ambient)
        elif keyAmbient == 'Cookings':
            self.addCooking(ambient)
        elif keyAmbient == 'LivingRooms':
            self.addLivingRoom(ambient)

    def addRoom(self, room):
        self.rooms.append(room)

    def addLivingRoom(self, livingRoom ):
        self.livingRooms.append(livingRoom)

    def addBathroom(self, bath):
        self.bathrooms.append(bath)

    def addCooking(self, cooking):
        self.cookings.append(cooking)

    def setGeneral(self, general):
        self.general = general

    def addSensors(self, key, sensor):
        self.sensors[key] = sensor

    def addExtra(self, key, extra):
        self.extras[key] = extra


    def getRoom(self, index):
        return self.rooms[index]

    def getLivingRoom(self, index):
        return self.livingRooms[index]

    def getBathroom(self, index):
        return self.bathrooms[index]

    def getCooking(self, index):
        return self.cookings[index]

    def getSensors(self, key):
        return self.sensors[key]

    def getGeneral(self):
        return self.general

    def getExtra(self, key):
        return self.extras[key]

