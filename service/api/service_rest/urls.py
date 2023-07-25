from django.urls import path

from .views import (api_list_appointments,
                    api_list_technicians,
                    api_show_technician,
                    api_finish_appointment,
                    api_cancel_appointment,
                    api_show_appointment,
)

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/", api_list_technicians, name="api_create_technicians"),
    path("technicians/<int:id>/", api_show_technician, name="api_show_technician"),
    path("technicians/<id>/", api_show_technician, name="api_delete_technician"),

    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/", api_list_appointments, name="api_create_appointment"),
    path("appointments/<int:id>/", api_show_appointment, name="api_show_appointments"),
    path("appointments/<id>/", api_show_appointment, name="api_delete_appointment"),
    path("appointments/<id>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<id>/finish/", api_finish_appointment, name="api_finish_appointment")
]
