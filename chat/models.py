from django.contrib.auth import get_user_model
from django.db import models
from datetime import timedelta

User = get_user_model()


class temp_user(models.Model):
    username = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        if self.created_at:
            time = (self.created_at + timedelta(hours=5, minutes=30)).strftime("%d/%b/%y %I:%M %p") + ' | '
        else:
            time = ''
        return f'{time}{self.status} | {self.username} - {self.password}'


class Profile(models.Model):
    username = models.CharField(max_length=100, null=True)
    password = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=100, null=True)
    name = models.CharField(max_length=100, null=True)
    auth_token = models.CharField(max_length=100, null=True)
    is_verified = models.BooleanField(default=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    branch = models.CharField(max_length=100, null=True, default='aiml')

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name="profile")

    def __str__(self):
        names = " ".join(f"{self.name}".split(' ')[0:2])
        time = (self.created_at + timedelta(hours=5, minutes=30)).strftime("%d/%b/%y %I:%M %p")
        if not self.is_verified:
            return f'{time} | {names} - {self.email} - {self.username} - {self.is_verified}'
        else:
            return f'{time} | {names} - {self.email} - {self.username}'


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    message = models.TextField()
    reply = models.TextField(null=True, blank=True)
    reply_user = models.TextField(null=True, blank=True)
    deleted = models.BooleanField(default=False)
    seen = models.BooleanField(default=False)
    seen_at = models.DateTimeField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("date_created",)

    def __str__(self):
        return f'{self.sender.username} - {self.receiver.username} - {self.message[:30]}'
