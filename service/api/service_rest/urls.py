from django.urls import path

from .views import (api_appointments,
                    api_list_technicians,
                    api_delete_appointment,
                    api_delete_technician,
                    api_finish_appointment,
                    api_cancel_appointment,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_technicians"),
    path("technicians/<str:employee_id>/", api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<id>/", api_delete_appointment, name="api_delete_appointment"),
    path("appointments/<id>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<id>/finish/", api_finish_appointment, name="api_finish_appointment")
]
