from django.contrib import admin
from .models import Sale, SalesPerson, Customer

# Register your models here.
admin.site.register(Sale)
admin.site.register(SalesPerson)
admin.site.register(Customer)
