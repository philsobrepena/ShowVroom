from django.urls import path
from .views import (
    api_list_customers,
    api_list_sales,
    api_list_salespeople,)

urlpatterns = [
    path("customers/", api_list_customers, name="api_list_customers"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
]
