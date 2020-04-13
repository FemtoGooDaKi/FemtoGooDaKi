FROM python:3.7-buster

COPY . .
RUN python -m pip install -r requirements.txt

WORKDIR course/

RUN python manage.py migrate
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
