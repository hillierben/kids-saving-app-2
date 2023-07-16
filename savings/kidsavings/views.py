from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, renderers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import JSONParser 

from .serializers import UserSerializer, TaskSerializer
from .models import User, Task, Child, Relationship

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    routes = {
        "/api/token",
        "/api/refresh"
    }
    return Response(routes)


# Serialize the username, so it appears in token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.first_name
        token['email'] = user.email
        # ...

        return token

# Create a view to route from url - this will obtain the custom serializer above.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerParent(request):
    if request.method == 'POST':
        username = request.data["email"]
        email = request.data["email"]
        password = request.data["password"]
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]

        # Attempt to create new user
        try:
            user = User.objects.create_user(
                username=username, 
                email=email, 
                password=password, 
                first_name=first_name, 
                last_name=last_name)
            user.save()
        except:
            pass

    return Response("Successfully Registered")


@api_view(["POST"])
def registerChild(request):
    if request.method == "POST":
        username = request.data["username"]
        firstName = request.data["firstName"]
        lastName = request.data["lastName"]
        password = request.data["password"]

    try:
        user = Child.objects.create_user(
            username=username, 
            email=f"{username}@gmail.com", 
            password=password, 
            first_name=firstName, 
            last_name=lastName,
        )
        user.save()

        child = Child.objects.get(username=username)

        Relationship.objects.create(parent=request.user, child=child)
        
    except:
        pass

    return Response("Successfully Registered")


@api_view(['POST'])
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.data["email"]
        password = request.data["password"]
        user = authenticate(request, username=email, password=password)
        name_object = User.objects.filter(email=user).values("first_name")

        try:
            name = list(name_object)[0]["first_name"]
        except:
            name = None

        profile = {
            "email": email,
            "navigate": "/portal",
            "name": name
        }

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return Response(profile)
        else:
            return Response("/login")


def logout_view(request):
    logout(request)


@api_view(['GET'])
def parentUserList(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addTask(request):
    user = str(request.user)
    user_id = User.objects.get(email=user)

    task = request.data["task"]
    amount = request.data["amount"]

    added_task = Task.objects.create(task=task, amount=amount, user=user_id)
    serializer = TaskSerializer(added_task, many=False)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTasks(request):
    user = str(request.user) 
    user_id = User.objects.get(email=user)
    tasks = Task.objects.filter(user_id=user_id)
    serializer = TaskSerializer(tasks, many=True)

    # Reverse the order of tasks, by time created
    reversed = sorted(serializer.data, key=lambda x: x["created"], reverse=True)
    return Response(reversed)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getSingleTask(request, pk):
    if request.method == "GET":
        try:
            task = Task.objects.get(pk=pk)
            serializer = TaskSerializer(task, many=False)
            return Response(serializer.data)
        except:
            return Response("Task does not exist")
            


@api_view(["GET", "POST", "PUT"])
@permission_classes([IsAuthenticated])
def editTask(request, pk):
    # try:
    task = Task.objects.get(pk=pk)
    if request.method == "POST":
        task.delete()
        return Response("Task Deleted")
    elif request.method == "PUT":
        updateTask = JSONParser().parse(request) 
        print(updateTask)
        serializer = TaskSerializer(task, data=updateTask)
        if serializer.is_valid():
            serializer.save()
            print("Task Updated")
        else:
            print("Not updated")
        return Response(serializer.data)
    # except:
    #     return Response("Task Does Not Exist")

