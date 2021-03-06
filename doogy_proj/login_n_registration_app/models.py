from django.db import models
import re
from datetime import datetime

# Create your models here.


class UserManager(models.Manager):
    def register_validator(self, data):
        errors = {}
        EMAIL_REGEX = re.compile(
            r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

        if len(data['first_name']) < 2:
            errors['first_name'] = "First Name - required; at least 2 characters; letters only"
        if len(data['last_name']) < 2:
            errors['last_name'] = "Last Name - required; at least 2 characters; letters only"
        if not EMAIL_REGEX.match(data['email']):
            errors['email'] = "Invalid email address!"
        if len(data['password']) < 8:
            errors['password'] = "Password - required; at least 8 characters;"
        if data['password'] != data['confirm_pw']:
            errors['confirm_pw'] = "Passwords don't match, matches password confirmation"

        return errors

    def login_validator(self, data):
        errors = {}

        EMAIL_REGEX = re.compile(
            r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

        if not EMAIL_REGEX.match(data['email']):
            errors['email'] = "Invalid email address!"
        if len(data['password']) < 8:
            errors['password'] = "Password - required; at least 8 characters;"

        return errors


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
