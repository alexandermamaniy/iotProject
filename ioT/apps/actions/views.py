from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse

from .classApp.my_class import Information, Connect

# Create your views here.



def index(request):
    return render(request, "index.html")

def ajaxR(request):

    if request.is_ajax():

        data = Information.getInstance()
        response = JsonResponse({'data':data.data,'data2':data.data2,'data3':data.data3 })
        
        return HttpResponse(response.content)
    else:

        return redirect("/")


def ajaxData(request):

    if request.is_ajax():
        conex = Connect.getInstance("/dev/ttyACM0")
        data =  request.GET['message']
        conex.setData(data)

        response = JsonResponse({"data":data})
        return HttpResponse(response.content)
    else:

        return redirect("/")
