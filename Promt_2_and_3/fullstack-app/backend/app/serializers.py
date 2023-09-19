from rest_framework import serializers
from .models import NamedCat

class NewNamedCatSerializer(serializers.ModelSerializer):
    class Meta:
        model =  NamedCat
        fields = '__all__'