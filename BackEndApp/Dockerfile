FROM python:3.8

ENV PYTHONBUFFERED 1

WORKDIR /code

COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . /code/
RUN mkdir -p ~/.autodl

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
