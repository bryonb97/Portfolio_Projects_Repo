from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.contrib import messages
from .models import *

# index allow the user to login with email and password. Also there is a link if they are new.
# route /
def index(request):
    return render(request, 'profile_app/index.html')

# form that allows the user to create a new account. Also there is a link if they already have an account
# route /register
def register(request):
    return render(request, 'profile_app/register_user.html')

# form that allows the user to create their profile and select a favorite pokemon/profile picture. Also select a username.
# route /choose_username
def choose_username(request):
    return render(request, 'profile_app/create_user.html')

# user register registers a new user
# route /register
def user_register(request):
    # check if user passes the registration validators
    if User.objects.registration_validator(request.POST, request):
        isValid = True
        return redirect('/choose_username')
    else:
        isValid = False
        return redirect('/register')  

# username create creates the user's username
# route /username_create
def username_create(request):
    # check if user passes the registration validators
    if User.objects.username_validator(request.POST, request):
        isValid = True
        return redirect('/home')
    else:
        isValid = False
        return redirect('/choose_username')

# user view renders the page to edit the username with their information already included
# route /user_view/<id>
def user_view(request, id):
    # the user has to be logged in to view the users quotes
    if 'logged_in' not in request.session:
        return redirect('/')
    # if the user is currently logged in show the users account info
    else:
        context = {
            'user': User.objects.get(id=id),
            'current_user': request.session['current_user'],
        }
        return render(request, 'profile_app/edit_profile.html', context) 

# user edit allows the user to update their information and then add it to the database
# route /user_update/<id>
def user_update(request, id):
    # the user has to be logged in to edit the users account
    if 'logged_in' not in request.session:
        return redirect('/')
    else:
        # check if they pass the registration validations
        if not (User.objects.registration_validator(request.POST, request)):
            isValid = False
            return redirect('/user_view/'+str(id))
        # if they pass let them update their information and hash a new password
        else:
            updated_user = User.objects.get(id=id)
            hash_updated_pw = bcrypt.hashpw(request.POST['reg_confirm_password'].encode(), bcrypt.gensalt())
            updated_user.email = request.POST['reg_email']
            updated_user.password = hash_updated_pw
            updated_user.save()
    return redirect('/user_view/'+ str(id))

# form that allows the user to choose a pokemon as their profile picture. Or they can use a normal picture
# route /choose_pokemon
# def choose_pokemon(request):
#     return render(request, 'profile_app/choose_pokemon.html')

# user_login handles the login request
# route /login
def login(request):
    # check if user passes the login validators
    if User.objects.login_validator(request.POST, request):
        isValid = True
        return redirect('/home')
    else:
        isValid = False
        return redirect('/')

# home renders the homepage
# route /home
def home(request):
    # the user has to be logged in to view the users quotes
    if 'logged_in' not in request.session:
        return redirect('/')
    # if the user is currently logged in show the users account info
    else:
        context = {
            'current_username': request.session['current_username']
        }
    return render(request, 'pokedex_app/pokedex_home.html', context)

# user_logout clears the session and redirects to the login page
# route /logout
def logout(request):
    request.session.clear()
    return redirect('/')