# Generated by Django 4.0.3 on 2023-07-26 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0009_appointment_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('IN_PROGRESS_STATUS', 'in progress'), ('CANCELED_STATUS', 'canceled'), ('FINISHED_STATUS', 'finished')], default='IN_PROGRESS_STATUS', max_length=200, null=True),
        ),
    ]
