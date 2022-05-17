from .views import *
from django.urls import path, include

urlpatterns = [
    path('api/employees', EmployeesAPI.as_view(), name='EmployeesAPI'),
    path('api/employee/<int:id>', EmployeeAPI.as_view(), name='EmployeeAPI'),
    path('api/concurrency-demo/<str:name1>/<str:name2>', ConcurrencyAPI.as_view(), name='ConcurrencyAPI'),
]