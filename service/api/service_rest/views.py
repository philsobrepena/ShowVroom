from django.http import JsonResponse
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
from django.views.decorators.http import require_http_methods
import json

# Create your views here.

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "vip",
        "id",
    ] 
    encoders= {
        "technician": TechnicianEncoder(),
    }
    # def get_extra_data(self, o):
    #     return {"status": o.status.STATUS_CHOICES}
    # is it o.status.name?? need to check 

# list technicians and create a technician
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians":technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        print(content)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message":"Error, Technician does not exist"},
                status=400,
            )

# show details, delete, and update a specific technician
@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technician(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        # count, _ = Technician.objects.filter(employee_id=id).delete()
        # return JsonResponse({"deleted": count >0})

        # can replace ablove lines for "DELETE" with below?
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=id).update(**content)
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

# list appointments and create appointments
@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            get_employee_id = content["technician"]
            technician = Technician.objects.get(employee_id=get_employee_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician Does not exist"},
                status=400
            )
        try:
            is_vip = AutomobileVO.objects.get(vin=content["vin"])
            content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
            # status=200
        )
        
#  specific appointment: show details, delete, & update
@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
            )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count >0})
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
            )

# cancel an appointment 
@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            # appointment.status = Appointment.CANCELED_STATUS
            appointment.status = "canceled"
            appointment.save()
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "appointment does not exist"},
                status=400
            )
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    

# finish an appointment
@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "finished"
            appointment.save()
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "appointment does not exist"},
                status=400
            )
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )