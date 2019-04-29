#---------------------------------------------------
# pokedex_app urls.py 
#---------------------------------------------------
from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^search$', views.index),
    url(r'^search_pokemon/$', views.poke_search),
]
