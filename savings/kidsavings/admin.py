from django.contrib import admin
from .models import User, Task, Relationship

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "role"]

class TaskAdmin(admin.ModelAdmin):
    list_display = ["id", "task", "user", "created", "complete"]

class RelationshipAdmin(admin.ModelAdmin):
    list_display = ["id", "parent", "child"]
    

admin.site.register(User, UserAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Relationship, RelationshipAdmin)
