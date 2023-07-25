from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=200, unique=False)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField(null=True, blank=True)

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True, blank=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    IN_PROGRESS_STATUS = 1
    CANCELED_STATUS = 2
    FINISHED_STATUS = 3
    STATUS_CHOICES = (
        (IN_PROGRESS_STATUS, 'In_progress'),
        (CANCELED_STATUS, 'Canceled'),
        (FINISHED_STATUS, 'Finished'),
    )
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.IntegerField(choices=STATUS_CHOICES, default=IN_PROGRESS_STATUS)
    # status = models.BooleanField(default=False)
    # status = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )