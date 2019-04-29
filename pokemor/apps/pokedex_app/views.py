from django.shortcuts import render, redirect

def index(request):
    # the user has to be logged in to view the users quotes
    if 'logged_in' not in request.session:
        return redirect('/')
    # if the user is currently logged in show the users account info
    else:
        context = {
            'current_username': request.session['current_username'],
            'current_user': request.session['current_user'],
        }
    return render(request, 'pokedex_app/pokedex_home.html', context)

def poke_search(request):
    # the user has to be logged in to view the users quotes
    if 'logged_in' not in request.session:
        return redirect('/')
    # if the user is currently logged in show the users account info
    else:
        context = {
            'current_username': request.session['current_username'],
            'current_user': request.session['current_user'],
        }
    return render(request, 'pokedex_app/pokedex.html', context)