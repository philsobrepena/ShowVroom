from django.http import JsonResponse
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, Appointment
from django.views.decorators.http import require_http_methods
import json

# Create your views here.

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
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
        "id",
    ] 
    encoders= {
        "technician": TechnicianEncoder(),
    }
    def get_extra_data(self, o):
        return {"status": o.status.STATUS_CHOICES}
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
    else:
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

# delete a specific technician
@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(employee_id=pk).delete()
        return JsonResponse({"deleted": count >0})

        # can replace lines 61-62 with 65-76?
        # try:
        #     technician = Technician.objects.get(id=pk)
        #     technician.delete()
        #     return JsonResponse(
        #         technician,
        #         encoder=TechnicianEncoder,
        #         safe=False,
        #     )
        # except Technician.DoesNotExist:
        #     response = JsonResponse({"message": "Does not exist"})
        #     response.status_code = 404
        #     return response

# list appointments and create appointments
@require_http_methods(["GET", "POST"])
def api_appointments(request):
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
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )

# delete an appointment
@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count >0})

# cancel an appointment 
@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = Appointment.CANCELED_STATUS
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
def api_finish_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.status = Appointment.FINISHED_STATUS
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