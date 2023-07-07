from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=49)
    last_name = models.CharField(max_length=49)
    parent_account = models.BooleanField(default=True)


class Task(models.Model):
    task = models.CharField(max_length=200)
    amount = models.DecimalField(decimal_places=2, default=0.00, max_digits=6)
    created = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    user = models.ForeignKey(User, related_name="task", on_delete=models.CASCADE)