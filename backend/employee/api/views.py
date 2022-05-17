from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
import json

# Create your views here.

class EmployeesAPI(APIView):
    def get(self, request):
        try:
            allEmployees = Employee.objects.filter()
            reqEmployees = []
            for a in allEmployees:
                reqEmployees.append({
                    "empNo": a.empNo,
                    "name": a.name,
                    "address": a.address,
                    "grade": a.grade,
                    "salary": a.salary,
                    "dateOfJoining": a.dateOfJoining,
                })
            return Response(reqEmployees)
        except:
            return Response({"status": "500 Some Error Occurred"})

    def post(self, request):
        try:
            empNo = request.data['empNo']
            name = request.data['name']
            address = request.data['address']
            grade = request.data['grade']
            salary = request.data['salary']
            dateOfJoining = request.data['dateOfJoining']
            newEmp = Employee(empNo=empNo, name=name, address=address, grade=grade, salary=salary, dateOfJoining=dateOfJoining)
            newEmp.save()
            return Response({"status": "201 OK"})
        except:
            return Response({"status": "500 Some Error Occurred"})

class EmployeeAPI(APIView):
    def get(self, request, id):
        try:
            thatInstance = Employee.objects.filter(empNo=id)[0]
            inst = {
                "empNo": thatInstance.empNo,
                "name": thatInstance.name,
                "address": thatInstance.address,
                "grade": thatInstance.grade,
                "salary": thatInstance.salary,
                "dateOfJoining": thatInstance.dateOfJoining
            }
            return Response(inst)
        except:
            return Response({"status": "404"})
    
    def delete(self, request, id):
        try:
            Employee.objects.filter(empNo=id).delete()
            return Response({"status": "202 Accepted", "message": "Employee deleted successfully."})
        except:
            return Response({"status": "500 Some Error Occurred"})
        
    def put(self, request, id):
        try:
            name = request.data['name']
            address = request.data['address']
            grade = request.data['grade']
            salary = request.data['salary']
            dateOfJoining = request.data['dateOfJoining']
            Employee.objects.filter(empNo=id).update(name=name, address=address, grade=grade, salary=salary, dateOfJoining=dateOfJoining)
            return Response({"status": "202 Accepted", "message": "Employee data updated successfully."})
        except:
            return Response({"status": "500 Some Error Occurred"})

class ConcurrencyAPI(APIView):
    def get(self, request, name1, name2):
        a = Employee.objects.get(empNo=1)
        a.name = name1

        b = Employee.objects.get(empNo=1)
        b.name = name2

        a.save()
        b.save()

        return Response({
            "message": "Write took place with no problems."
        })
