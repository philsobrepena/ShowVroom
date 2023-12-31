# Generated by Django 4.0.3 on 2023-07-26 02:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0006_alter_salesperson_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='automobiles', to='sales_rest.automobilevo'),
        ),
    ]
