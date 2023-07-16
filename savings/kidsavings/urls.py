from django.urls import path, include
from . views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path("", views.apiOverview, name="apiOverview"),
    path('api-auth/', include('rest_framework.urls')),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("parent-users/", views.parentUserList, name="parent-users"),
    path("register-parent/", views.registerParent, name="register-parent"),
    path("register-child/", views.registerChild, name="register-child"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout, name="logout"),
    path("add-task/", views.addTask, name="add-task"),
    path("get-tasks/", views.getTasks, name="get-tasks"),
    path("get-single-task/<int:pk>/", views.getSingleTask, name="get-single-task"),
    path("edit-task/<int:pk>/", views.editTask, name="edit-task"),
]