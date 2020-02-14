from django.shortcuts import render, redirect, HttpResponse

# Create your views here.


def index(request):
    context = {
        'message': "JS is working"
    }

    request.session['dark_mode'] = False
    return render(request, 'index.html', context)


def home(request):
    return render(request, 'index.html')
