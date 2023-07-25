from django.shortcuts import get_object_or_404
from common.json import ModelEncoder
from .models import SalesPerson, Customer, Sale, AutomobileVO
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.

#listsalespeopleencoder
class ListSalespeopleEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["first_name", "last_name", "employee_id"]

#listcustomersencoder
class ListCustomersEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]

#listsalesencoder
class ListSalesEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "vin", "salesperson", "customer", "price", "id"]

    def get_extra_data(self, o):
        return {
            "automobile": o.auto.vin,
            "salesperson": o.employee_id,
            "customer": o.customer.id,
                }


#getpostdelete list salespeople
@require_http_methods(["GET", "POST", "DELETE"])
def api_list_salespeople(request, id=None):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all().values()
        return JsonResponse(
            {"salespeople": list(salespeople)},
            encoder = ListSalespeopleEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=ListSalespeopleEncoder,
            safe=False,
        )
    else: #DELETE
        try:
            salesperson = SalesPerson.objects.get(employee_id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=ListSalespeopleEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "salesperson does not exist"}
            )


#getpostdelete list customers
@require_http_methods(["GET", "POST", "DELETE"])
def api_list_customers(request, id=None):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=ListCustomersEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=ListCustomersEncoder,
            safe=False,
        )
    else:  # DELETE
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=ListCustomersEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"}
            )




#getpostdelete list sales
@require_http_methods(["GET", "POST", "DELETE"])
def api_list_sales(request, id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": list(sales.values())},
            encoder=ListSalesEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        print(content)
        ### CUSTOMER
        try:

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer


        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "invalid customer"},
                status=400,
            )
        ### SALESPERSON
        try:
            salesperson_id = content["salesperson"]
            salesperson = SalesPerson.objects.get(employee_id=salesperson_id)
            content["salesperson"] = salesperson

#########
            auto_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=auto_vin)
            content["automobile"] = automobile

        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "invalid salesperson"},
                status=400,
            )
        ### AUTOMOBILE
        # try:
        #     auto_vin = content["automobile"]
        #     automobile = AutomobileVO.objects.get(vin=auto_vin)
        #     content["automobile"] = automobile

        # except AutomobileVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "invalid automobile"},
        #         status=400,
        #     )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=ListSalesEncoder,
            safe=False,
        )
    else:  # DELETE
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=ListSalesEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"}
            )
