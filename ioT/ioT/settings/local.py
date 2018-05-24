from base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


STATIC_URL = '/static/'
# variable que indica la ruta en donde va estar nuestros templates, este busca en nuestras  app a este directorio
TEMPLATE_DIR = [ os.path.join(BASE_DIR,'templates') ]
# variable que indica la ruta en donde va a buscar nuestro archvos staticos
STATICFILES_DIR = [ os.path.join(BASE_DIR, 'static' ) ]

MEDIA_URL  = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'media')