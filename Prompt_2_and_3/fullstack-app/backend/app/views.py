from django.shortcuts import render
from .models import NamedCat
from rest_framework.response import Response
from django.core import serializers
from django.http import HttpResponse
from .serializers import NewNamedCatSerializer
from rest_framework import status
from rest_framework.views import APIView


class CreateNamedCat(APIView):
    """
    Create a new NamedCat object.
    """
    serializer_class = NewNamedCatSerializer

    def post(self, request):
        """
        Create a new NamedCat object from the request data.

        Args:
            request: The HTTP request object.

        Returns:
            A Response object with a status code of 200 OK.
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            image_url = serializer.data.get('image_url')
            NamedCat.objects.create(name = name, image_url = image_url)
            return Response(status=status.HTTP_200_OK)

class ReadNamedCat(APIView): 
    """
    Retrieve all NamedCat objects.
    """

    def get(self, request):
        """
        Retrieve all NamedCat objects and serialize them to JSON.

        Returns:
            A Response object with the serialized data for all NamedCat objects.
        """
        namedCats = NamedCat.objects.all()
        namedCats_json = serializers.serialize('json', namedCats)
        return HttpResponse(namedCats_json, content_type='application/json')
        
class UpdateNamedCat(APIView):
    """
    Update a NamedCat object.
    """
    serializer_class = NewNamedCatSerializer

    def put(self, request, pk):
        """
        Update a NamedCat object from the request data.

        Args:
            request: The HTTP request object.
            pk: The primary key of the NamedCat object to update.

        Returns:
            A Response object with a status code of 200 OK.
        """
    def put(self, request, pk):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            image_url = serializer.data.get('image_url')
            NamedCat.objects.filter(pk = pk).update(name = name, image_url = image_url)
            return Response(status=status.HTTP_200_OK)
        
class DeleteNamedCat(APIView):
    """
    Delete a NamedCat object.
    """
    def delete(self, request, pk):
        """
        Delete a NamedCat object by its primary key.

        Args:
            request: The HTTP request object.
            pk: The primary key of the NamedCat object to delete.

        Returns:
            A Response object with a status code of 200 OK.
        """
        NamedCat.objects.filter(pk=pk).delete()
        return Response(status=status.HTTP_200_OK)

