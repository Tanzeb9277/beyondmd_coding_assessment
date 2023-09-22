from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views


app_name = 'app'

urlpatterns = [
    path('cats/', views.ReadNamedCat.as_view(), name="cats"),
    path('addCats/', views.CreateNamedCat.as_view(), name='add_cat'),
    path('updateCat/<int:pk>/', views.UpdateNamedCat.as_view(), name='update_cat'),
    path('deleteCat/<int:pk>/', views.DeleteNamedCat.as_view(), name='delete_cat'),
]