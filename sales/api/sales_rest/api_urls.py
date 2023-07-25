from django.urls import path
from .views import (
    api_list_customers,
    api_list_sales,
    api_list_salespeople,)

urlpatterns = [
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>", api_list_customers, name="api_delete_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>", api_list_sales, name="api_delete_sale"),
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("salespeople/<int:id>", api_list_salespeople, name="api_delete_salesperson"),
]
