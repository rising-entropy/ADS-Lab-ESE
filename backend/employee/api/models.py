from django.db import models
from concurrency.fields import IntegerVersionField

# Create your models here.
class Employee(models.Model):
    # new field for concurrency control
    version = IntegerVersionField( )
    empNo = models.IntegerField(unique=True)
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=40)
    grade = models.IntegerField()
    salary = models.FloatField()
    dateOfJoining = models.DateField()