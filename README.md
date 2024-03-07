# Final Project Ideas

<a href="https://www.youtube.com/watch?v=uCQTjrl2_qs">Watch a demonstration of the app here</a>



## Contents

- [Installation](#installation)
- [Running the application](#running-the-application)
- [Distinctiveness and Complexity](#distinctiveness-and-complexity)
    - [Aim of the App](#aim-of-the-app)
    - [Features](#features)
    - [Limitations and Futures Ideas](#limitations-and-futures-ideas)
    - [Implementation](#implementation)

<br>

## Installation

Clone repository from GitHub
```
git clone https://github.com/hillierben/kids-saving-app-2.git

```

CD into savings and install Django dependencies 
```
cd /savings
pip install -r requirements.txt
```

CD into frontend and install npm dependencies
```
cd /frontend
npm install
```
<br/>

## Running the application

To run application, 2 ports are needed to run.
- Port 8000 for Django REST API
- Port 3000 for React interface

Open terminal, 
```
cd /savings
```
Run
```
python3 manage.py runserver
```

In separate terminal,
```
cd /frontend
```
Run
```
npm start
```

In browser, visit http://localhost:3000/

<br/>




## Distinctiveness and Complexity

### Aim of the app

This app is aimed at children between 5 and 12, to help them practice saving money. They carry out tasks, set by their parents, to earn pocket money. Parents add the tasks and set the amount their child can earn. Once the child completes the task, their parent can mark the task complete, and the amount is added to the total pocket money saved. 

The purpose is to help children see the value of earning money. Recently, there has been a shift in how we pay for items, and less people carry cash. Handing your child physical money can be inconvenient, however children respond more positively when they can see the reward of their work. This app is designed to show them what they have earned and see the results of completing tasks. In addition, children don't have to be with their parents to see their earnings. Both parent and child have their own accounts and can login to add, edit or view tasks. 


### Features

Parents register and account and login. They can then add children to their account, which then creates an account for that child. For each registered child, the parent can add, edit, delete and complete tasks. When completed, the amount is added to the childs total earnings.

Children can log in to their own accounts to view the tasks and their total earnings. When completed the task will appear with a strikethrough. 


### Limitations and Futures Ideas

The app is, currently, very basic. The child account has no functionality, other than viewing tasks and earnings. Future iterations of the app will allow children to mark tasks as complete and send messages/notifications to their parent(s). Additionally, children will be able to add products they wish to buy, add an image of the item, price and url link to the online store. The app will be more visiually engaging, with completion bars to show the child how close they are to saving for a given item. 


### Implementation

The app is built with Django and Django REST Framework on the backend, and React on the frontend. 


### Backend

**Django**


Django is used as an API, storing data about the users, tasks and parent-children relationships. The parent User model takes from AbstractUser, and a second Child user model is a proxy of User. Both these models have been amended to define a 'Role', which acts ensures both types of accounts are treated differently. 

a Relationship model exits, which use Foreign Keys to link parent/child accounts. An instance is created when a parent creates a child account. A Task model exists, containing data of the task, amount and completed status(bool). It contains Foreign Keys for child/parent.

Data is stored using SQLite. Django REST Framework is used to Serialize the data. JWT Token is used to authenticate the user when logging in, and calling data from the api. 


### Frontend

**React**

React framework was used on the frontend to display data, and create a pleasing UI, that is mobile responsive. This was a significant learning curve and a good deal of time was spent understanding how Javascript and React work. I also deepened my understanding of CSS, exploring Tailwind in various sections of my code. Key techniques employed include:
- React-Router-Dom
- Passing Props
- useState / useEffect / useContent
- fetch / async / await
- Working with Events
- State
- Tailwind
- CSS Grid / Flex

















