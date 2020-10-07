#!/bin/bash

cd "$(dirname "$0")"
source venv/bin/activate
./manage.py runserver 0:9999

