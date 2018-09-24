from mcp3208 import MCP3208
from threading import Thread
from time import sleep


class ConnectionMCP(object):
    connection = None

    def __init__(self):
        self.client = MCP3208()
        self.threadStart = Thread(target = self.__start)
        self.threadStart.setDaemon(True)
        self.threadStart.start()

    def getLdr(self):
        return self.ldr

    def getMq135(self):
        return self.mq135

    def __start(self):
        while True:
            self.ldr = self.client.read(0)
            self.mq135 = self.client.read(1)
            sleep(0.5)

    @staticmethod
    def getInstance():
        if ConnectionMCP.connection == None:
            ConnectionMCP.connection = ConnectionMCP()
        return ConnectionMCP.connection
