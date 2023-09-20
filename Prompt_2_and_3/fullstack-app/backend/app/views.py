from django.shortcuts import render
from .models import NamedCat
from django.shortcuts import get_object_or_404, render, redirect
from django.views import generic
from rest_framework.decorators import api_view
from django.db.models import OuterRef
from django.db.models.functions import JSONObject
from rest_framework.response import Response
from django.core import serializers
from django.http import HttpResponseRedirect, HttpResponse
from .serializers import NewNamedCatSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt


class NewNamedCat(APIView):
    serializer_class = NewNamedCatSerializer
    def post(self, request):
        name = "Felix"
        image_url = "https://cdn2.thecatapi.com/images/b20.jpg"
        NamedCat.objects.create(name = name, image_url = image_url)
        return Response(status=status.HTTP_200_OK)


def send_some_data(request):
    namedCats = NamedCat.objects.all()
    namedCats_json = serializers.serialize('json', namedCats)
    return HttpResponse(namedCats_json, content_type='application/json')
