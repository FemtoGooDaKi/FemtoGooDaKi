# Generated by Django 3.0.4 on 2020-03-26 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('password_hash', models.CharField(max_length=128)),
                ('firstName', models.CharField(max_length=30)),
                ('lastName', models.CharField(max_length=30)),
                ('birthDate', models.DateField()),
                ('registerDate', models.DateField()),
                ('job', models.CharField(max_length=30)),
            ],
        ),
    ]