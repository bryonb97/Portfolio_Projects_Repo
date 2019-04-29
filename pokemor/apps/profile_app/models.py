from django.db import models
from django.contrib import messages
import bcrypt

# User Validations
class UserManager(models.Manager):
    def registration_validator(self, postData, request):
        isValid = True
        # user password cannot be fewer than 8 characters
        if len(postData['reg_password']) < 8:
            messages.warning(request, 'Password is not long enough.')
            isValid = False
        # user password must match confirm_password
        if postData['reg_password'] != postData['reg_confirm_password']:
            messages.warning(request, 'Passwords do not match.')
            isValid = False
        # user email cannot exist withing the User model already
        users = User.objects.all()
        for user in users:
            if postData['reg_email'] == user.email:
                messages.warning(request, 'User exists already')
                isValid = False
        # if all validators are passed add the user as an object and hash their password
        if isValid == True:
            messages.success(request, "Successfully Registered User!")
            hashed_pw = bcrypt.hashpw(postData['reg_password'].encode(), bcrypt.gensalt())
            new_user = User.objects.create(
                email = postData['reg_email'],
                password = hashed_pw,
                username = ""
            )
            request.session['logged_in'] = True
            request.session['current_user'] = new_user.id
            request.session['current_user_name'] = new_user.username
        return isValid

    def username_validator(self, postData, request):
        isValid = True
        # username cannot be fewer than 5 characters
        if len(postData['username']) < 5:
            messages.warning(request, 'Username must be at least 5 characters.')
            isValid = False
        # check if the Username entered in the User model exists
        username_exists = False
        users = User.objects.all()
        for user in users:
            # check the Username to make sure it is unique
            if postData['username'] == user.username:
                username_exists = True
        if username_exists:
            print(user.username)
            messages.warning(request, "This Username is already taken.")
            isValid = False
        else:
            # set the username to equal what the user entered
            new_user = User.objects.last()
            new_user.username = request.POST['username']
            new_user.save()
            messages.success(request, f"Successfully created new user: {new_user.username}.")
            isValid = True
        return isValid

    def login_validator(self, postData, request):
        isValid = True
        # login password cannot be fewer than 8 characters
        if len(postData['login_password']) < 8:
            messages.warning(request, 'Password must be at least 8 characters.')
            isValid = False
        # check if the email enterd to login exists in the User model
        email = False
        users = User.objects.all()
        for user in users:
            # check the password associated with the user that contains the email address
            if postData['login_email'] == user.email:
                email = True
                if not bcrypt.checkpw(postData['login_password'].encode(), user.password.encode()):
                    messages.warning(request, "Unsuccessful login. Incorrect password.")
                    isValid = False
            # check if the hashed password is equal to what the user entered
            if bcrypt.checkpw(postData['login_password'].encode(), user.password.encode()):
                isValid = True
                logged_in_user = User.objects.get(email=request.POST['login_email'])
                request.session['logged_in'] = True
                request.session['current_user'] = logged_in_user.id
                request.session['current_username'] = logged_in_user.username
                print(f'============{logged_in_user.username}==============')
        # tell user if the email is not in the User model
        if not email:
            messages.warning(request, "Email does not exist in our records.")
            isValid = False
        return isValid

# User Model
class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.TextField()
    email = models.EmailField()
    username = models.CharField(max_length=15, default="")
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # link in the UserManager validators
    objects = UserManager()