from threading import Thread
import serial
import glob




class Conexion(object):
    conexion = None

    def __init__(self):
        self.__conexion = serial.Serial( self.getPort() )
        self.gas = 0
        self.ldr = 0
        self.threadValues = Thread(target= self.updateValues)
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