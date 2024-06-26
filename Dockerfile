FROM python:3.12-alpine

WORKDIR /app

COPY ./notifications/. /app

# COPY ./.env.production /app/.env.production

RUN echo "def mode():" > /app/EDITME.py
RUN echo "    return \"prod\"" >> /app/EDITME.py

RUN pip install -r requirements.txt

