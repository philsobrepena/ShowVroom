# Generated by Django 4.0.3 on 2023-07-25 19:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_alter_automobilevo_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='technician',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='technician', to='service_rest.technician'),
        ),
    ]