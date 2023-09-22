from django.shortcuts import render
from .models import NamedCat
from rest_framework.response import Response
from django.core import serializers
from django.http import HttpResponse
from .serializers import NewNamedCatSerializer
from rest_framework import status
from rest_framework.views import APIView



class CreateNamedCat(APIView):
    serializer_class = NewNamedCatSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            image_url = serializer.data.get('image_url')
            NamedCat.objects.create(name = name, image_url = image_url)
            return Response(status=status.HTTP_200_OK)

class ReadNamedCat(APIView): 
    def get(self, request):
        namedCats = NamedCat.objects.all()
        namedCats_json = serializers.serialize('json', namedCats)
        return HttpResponse(namedCats_json, content_type='application/json')
        
class UpdateNamedCat(APIView):
    serializer_class = NewNamedCatSerializer
    def put(self, request, pk):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            image_url = serializer.data.get('image_url')
            NamedCat.objects.filter(pk = pk).update(name = name, image_url = image_url)
            return Response(status=status.HTTP_200_OK)
        
class DeleteNamedCat(APIView):
    def delete(self, request, pk):
        NamedCat.objects.filter(pk = pk).delete()
        return Response(status=status.HTTP_200_OK)

