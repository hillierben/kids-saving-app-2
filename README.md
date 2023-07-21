# Final Project Ideas

In a README.md in your project’s main directory, include a writeup describing your project, and specifically your file MUST include all of the following:
Under its own header within the README called Distinctiveness and Complexity: Why you believe your project satisfies the distinctiveness and complexity requirements, mentioned above.
What’s contained in each file you created.
How to run your application.
Any other additional information the staff should know about your project.
If you’ve added any Python packages that need to be installed in order to run your web application, be sure to add them to a requirements.txt file!
Though there is not a hard requirement here, a README.md in the neighborhood of 500 words is likely a solid target, assuming the other requirements are also satisfied.


## Contents

- [Aim of the website](#aim-of-the-website)
- [Installation](#installation)
- [Running the application](#running-the-application)
- [Key Objectives](#key-objectives)
- [Inspiration](#inspiration)

<br>


# Installation

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

# Running the application

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
---




# Distinctiveness and Complexity

>Your web application must be sufficiently distinct from the other projects in this course (and, in addition, may not be based on the old CS50W Pizza project), and more complex than those.

>A project that appears to be a social network is a priori deemed by the staff to be indistinct from Project 4, and should not be submitted; it will be rejected.

>A project that appears to be an e-commerce site is strongly suspected to be indistinct from Project 2, and your README.md file should be very clear as to why it’s not. Failing that, it should not be submitted; it will be rejected.

>Your web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.
Your web application must be mobile-responsive

<br>

## Aim of the website

- **Portfolio website**
- Kids app for managing money and saving
- Pocket money
- Job list for earning money
- Items to buy list
- Linked to parent account for adding and completing jobs

<br>

## Key Objectives

- Design the interface with Sigma
- Code the frontend with React
- Build an API with Django Rest API
- Design original icons
- Design original logos
- Docker Compose for deployment
- Mobile Responsive

<br>

## Techniques to include

- Models
- Register Users
    - Create a profile
    - Create an avatar
- Pagination
- Task list
- Docker
- APIs
- Well-designed UX


## Inspiration

<br>

## Frontend


### React

<br>

## Backend


### Django


<br>

# How to run the application

<br>

# Files and Code

## Django and React

Running a Reactjs template within Django. Create a ReactJS app within the Django root folder

<img src="frontend/src/images/react-folder.png" width="200">

In Settings - Templates, add the pathway to Reacts index.html file

```yaml
- in settings: locate the #TEMPLATES dictionary
"DIRS": [
            os.path.join(BASE_DIR, "frontend/build"),
        ],
```

Add path to static files

```yaml
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend/build/static")
]
```

Ensure to Run Build so the React page is up to date when launched through Djano.

```yaml
cd frontend
npm run build
```

---

## React
### Navbar

Using React Components and Props, pass a function(selectPage state) from App.js(parent) to Navbar.js(child). Each link in Navbar.js calls this function onCick, and passes the name of the page that should be displayed in App.js.

**Example**

In App.js, the State variable to be changed
```yaml
const[pageSelector, setPageSelector] = React.useState("login");
```
Pass the State variable as a prop to the Navbar component
```yaml
return (
    <>
      <Navbar handlePage={e => setPageSelector(e)}/>
      {page}
    </>
  );
```

In, Navbar.js (the child component), receive the prop. Use onClick to Call the prop.

```yaml
const Navbar = (props) => {
  return (
    <div>
      Navbar
      <a onClick={() => props.handlePage("register")}>Register</a>
      <a onClick={() => props.handlePage("login")}>Login</a>
      <a onClick={() => props.handlePage("dashboard")}>Dashboard</a>
      <a onClick={() => props.handlePage("parent-portal")}>Parent Portal</a>
    </div>
  )
}
```

A very basic look at the result...

<img src="frontend/src/gifs/navbar.gif" width="300">


Distinctiveness and Complexity: Why you believe your project satisfies the distinctiveness and complexity requirements, mentioned above.
What’s contained in each file you created.
How to run your application.
Any other additional information the staff should know about your project.