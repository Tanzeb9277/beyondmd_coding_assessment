from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views


app_name = 'app'

urlpatterns = [
    path('test/', views.send_some_data, name="index"), # Add this
    path('addCat/', views.NewNamedCat.as_view(), name='add_cat'),
]