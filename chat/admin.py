from django.contrib import admin

from .models import Message, Profile, temp_user

admin.site.register(Message)
admin.site.register(Profile)
admin.site.register(temp_user)

admin.site.site_header = "👀 Welcome to Command Central 💬"
admin.site.index_title = 'Welcome to Admin Portal'
admin.site.site_title = 'Site Administration ✉'