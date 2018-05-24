from django.conf.urls import patterns, url


urlpatterns = patterns('',
    url(r'^$', 'apps.actions.views.index'),
    url(r'^ajaxR$', 'apps.actions.views.ajaxR'),
)
