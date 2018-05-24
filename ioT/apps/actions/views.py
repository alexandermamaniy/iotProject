from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
import random
# Create your views here.

def index(request):
    return render(request, "index.html")

def ajaxR(request):
    """
    if request.is_ajax():
        response = JsonResponse({'dato':random.randint(1,40)})
        return HttpResponse(response.content)
    else:
        return redirect("/")
    """
    response = JsonResponse({'dato': random.randint(1, 40)})
    return HttpResponse(response.content)
