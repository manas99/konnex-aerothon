# Generated by Django 3.0 on 2021-05-22 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='feedback',
            options={'ordering': ('created_at',)},
        ),
        migrations.AlterField(
            model_name='feedback',
            name='title',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
