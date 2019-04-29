#---------------------------------------------------
# profile_app urls.py 
#---------------------------------------------------
from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^register/$', views.register),
    url(r'^choose_username$', views.choose_username),
    url(r'^user_register/$', views.user_register),
    url(r'^user_view/(?P<id>\d+)/$', views.user_view),
    url(r'^user_edit/(?P<id>\d+)/$', views.user_update),
    url(r'^username_create/$', views.username_create),
    url(r'^login/$', views.login),
    url(r'^home/$', views.home),
    url(r'^logout/$', views.logout),
    

]
