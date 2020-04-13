FROM python:3.7-buster

COPY . .
RUN python -m pip install -r requirements.txt

WORKDIR enrollment/
CMD ["sh", "-c", "python manage.py migrate; python manage.py runserver 0.0.0.0:8000"]
