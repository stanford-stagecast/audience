import os
import json
import random
from datetime import datetime

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.conf import settings
from django.http import HttpResponse
from accounts.models import InvitationToken
from accounts.utils import random_token


def index(request):
    return render(request, 'puffer/index.html')

@login_required(login_url='/accounts/login/')
def player(request):
    # generate a random port or use a superuser-specified port
    port = None
    if request.user.is_superuser:
        port = request.GET.get('port', None)

    if port is None:
        total_servers = settings.TOTAL_SERVERS
        base_port = settings.WS_BASE_PORT
        port = str(base_port + random.randint(1, total_servers))

    # parameters passed to Javascript stored in JSON
    params = {'session_key': request.session.session_key,
              'username': request.user.username,
              'debug': settings.DEBUG,
              'port': port}
    context = {'params_json': json.dumps(params)}

    return render(request, 'puffer/player.html', context)
