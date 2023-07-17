from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

# Create your models here.
class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=49)
    last_name = models.CharField(max_length=49)

    class Role(models.TextChoices):
        PARENT = "PARENT", "Parent"
        CHILD = "CHILD", "Child"

    base_role = Role.PARENT
    role = models.CharField(max_length=50, choices=Role.choices)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)
        

# Filter queries to only show Child results
class ChildManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.CHILD)


class Child(User):
    base_role = User.Role.CHILD
    # Accesses Child Manager to only include Child users in results
    child = ChildManager()
    
    class Meta:
        proxy = True


class Relationship(models.Model):
    parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="parent")
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name="child")


class Task(models.Model):
    task = models.CharField(max_length=200)
    amount = models.DecimalField(decimal_places=2, default=0.00, max_digits=6)
    created = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    user = models.ForeignKey(User, related_name="task", on_delete=models.CASCADE)
    childUser = models.ForeignKey(Child, related_name="childUser", on_delete=models.CASCADE)



