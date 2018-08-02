#!/usr/bin/python3.5
# coding: utf-8

import firebase_admin
from firebase_admin import credentials, db, auth


# Fetch the service account key JSON file contents
cred = credentials.Certificate('/home/alex/trabajos_de_cursos/Raspberry/Raspberry/pruebas_firebase_user/cred.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
'databaseURL': 'https://project-iot-e19fe.firebaseio.com'
})

# As an admin, the app has access to read and write all data, regradless of Security Rules
#ref = db.reference('message')
#print(ref.path)


user_created4 = auth.create_user(
    uid='pepito4',
    email='userPru4@gmail.com',
    email_verified=False,
    phone_number='+591686865413',
    password = 'pepito1234',
    display_name = 'Pepito Ponte',
    photo_url = 'https://www.google.com/search?biw=1366&bih=568&tbm=isch&sa=1&ei=tp9QW7mnMYuY_QbDg7qwCQ&q=fotos+gatos+sin+enlace&oq=fotos+gatos+sin+enlace&gs_l=img.3...23996.26529.0.26724.11.10.0.0.0.0.398.1406.3-4.4.0....0...1c.1.64.img..7.2.767...0j0i67k1j0i8i30k1.0.nVUnODc80a4#imgrc=dg0W2jO8BL1W1M:',
    disabled = False )

user_created3 = auth.create_user(
    uid='pepito3',
    email='userPru3@gmail.com',
    email_verified=False,
    phone_number='+591686865414',
    password = 'pepito1234',
    display_name = 'Pepito Ramirez',
    photo_url = 'https://www.google.com/search?biw=1366&bih=568&tbm=isch&sa=1&ei=tp9QW7mnMYuY_QbDg7qwCQ&q=fotos+gatos+sin+enlace&oq=fotos+gatos+sin+enlace&gs_l=img.3...23996.26529.0.26724.11.10.0.0.0.0.398.1406.3-4.4.0....0...1c.1.64.img..7.2.767...0j0i67k1j0i8i30k1.0.nVUnODc80a4#imgrc=dg0W2jO8BL1W1M:',
    disabled = False )

user_created2 = auth.create_user(
    uid='pepito2',
    email='userPru2@gmail.com',
    email_verified=False,
    phone_number='+591686865416',
    password = 'pepito1234',
    display_name = 'Pepito Perez',
    photo_url = 'https://www.google.com/search?biw=1366&bih=568&tbm=isch&sa=1&ei=tp9QW7mnMYuY_QbDg7qwCQ&q=fotos+gatos+sin+enlace&oq=fotos+gatos+sin+enlace&gs_l=img.3...23996.26529.0.26724.11.10.0.0.0.0.398.1406.3-4.4.0....0...1c.1.64.img..7.2.767...0j0i67k1j0i8i30k1.0.nVUnODc80a4#imgrc=dg0W2jO8BL1W1M:',
    disabled = False )

user_created1 = auth.create_user(
    uid='pepito1',
    email='userPru1@gmail.com',
    email_verified=False,
    phone_number='+591686865419',
    password = 'pepito1234',
    display_name = 'Pepito Juarez',
    photo_url = 'https://www.google.com/search?biw=1366&bih=568&tbm=isch&sa=1&ei=tp9QW7mnMYuY_QbDg7qwCQ&q=fotos+gatos+sin+enlace&oq=fotos+gatos+sin+enlace&gs_l=img.3...23996.26529.0.26724.11.10.0.0.0.0.398.1406.3-4.4.0....0...1c.1.64.img..7.2.767...0j0i67k1j0i8i30k1.0.nVUnODc80a4#imgrc=dg0W2jO8BL1W1M:',
    disabled = False )


userPru4Update = auth.update_user('pepito4', display_name='Pepito Update' )



userPru1 = auth.get_user_by_email('userpru1@gmail.com')
userPru2 = auth.get_user_by_email('userpru2@gmail.com')
userPru3 = auth.get_user_by_phone_number('+591686865414')
userPru4 = auth.get_user('pepito4')


print(userPru1.email)
print(userPru2.email)
print(userPru3.email)
print(userPru4.display_name)

list_users = auth.list_users().iterate_all()


for user in list_users:
    print(user.email)
