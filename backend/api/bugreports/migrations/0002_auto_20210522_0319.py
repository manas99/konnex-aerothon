# Generated by Django 3.0 on 2021-05-22 03:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bugreports', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bugreport',
            options={'ordering': ('created_at',)},
        ),
    ]
