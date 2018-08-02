#!/usr/bin/python3.5
# coding: utf-8

import firebase_admin
from  firebase_admin import auth, db, credentials

cred = credentials.Certificate('/home/alex/trabajos_de_cursos/Django2/ProjectIoTSCESI/pruebas_firebase_user/cred.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://rpi-demo-819dd.firebaseio.com'
})


ref1 = db.reference()

ref2 = db.reference()