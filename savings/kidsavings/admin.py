from django.contrib import admin
from .models import User, Task

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "username"]

class TaskAdmin(admin.ModelAdmin):
    list_display = ["id", "task", "user", "created", "complete"]
    

admin.site.register(User, UserAdmin)
admin.site.register(Task, TaskAdmin)
