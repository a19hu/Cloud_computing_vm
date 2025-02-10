# myapp/admin.py
from django.contrib import admin
from .models import CustomUser  # Replace with your model name

# Register your model here
admin.site.register(CustomUser)