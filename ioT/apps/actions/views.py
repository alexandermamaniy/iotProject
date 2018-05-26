from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
import random
from .classApp.my_class import Information

# Create your views here.

def index(request):
    return render(request, "index.html")

def ajaxR(request):

    if request.is_ajax():

        #data = Information.getInstance()
        #response = JsonResponse({'data':data.data})

        response = JsonResponse({'data': 35})

        return HttpResponse(response.content)
    else:

        return redirect("/")

    #response = JsonResponse({'dato': random.randint(1, 40)})
    #return HttpResponse(response.content)
