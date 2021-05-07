FROM python:3.7.4

ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY DLMML/ /code/DLMML

COPY BackEndApp/ /code/BackEndApp

WORKDIR /code/BackEndApp

EXPOSE 8000
