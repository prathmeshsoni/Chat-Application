from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('', views.dashboard, name="dashboard"),

    path('login/', views.login, name="login"),
    
    path('verify/<auth_token>/', views.verify, name="verify"),
    path('logout/', LogoutView.as_view(), name="logout"),

    path('profile/', views.profile, name="profile"),

    path('delete/', views.delete, name="delete"),

    path("<str:username>/", views.chats, name="chatroom"),
    path("ajax/<str:username>/", views.all_messages, name="all-messages"),
]
