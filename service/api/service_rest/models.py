from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=200, unique=False)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True, default=False)

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True, blank=True)
    # vin = models.CharField(max_length=17, unique=True)
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    # https://stackoverflow.com/questions/1117564/set-django-integerfield-by-choices-name
    # https://www.b-list.org/weblog/2007/nov/02/handle-choices-right-way/
    # IN_PROGRESS_STATUS = 1
    # CANCELED_STATUS = 2
    # FINISHED_STATUS = 3
    STATUS_CHOICES = (
        ('IN_PROGRESS_STATUS', 'in progress'),
        ('CANCELED_STATUS', 'canceled'),
        ('FINISHED_STATUS', 'finished'),
    )
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(
        max_length=200,
        choices=STATUS_CHOICES,
        null=True,
        default='in progress'
        )
    # status = models.BooleanField(default=False)
    # status = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    id= models.AutoField(primary_key=True)
    vip = models.BooleanField(default=False)