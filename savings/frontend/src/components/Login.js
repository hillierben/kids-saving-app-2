import React from 'react'
import csrftoken from './CSRFToken';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import TokenContext from '../contexts/Token';
import jwt_decode from "jwt-decode";

const Login = (props) => {
  const[formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const{setToken, setUser} = useContext(TokenContext);

  // Update registerData whenever form data changes
  function handleChange(event) {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // Login user
  let loginUser = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // // 'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        username: formData.email,
        password: formData.password
        
      })
    })
    let data = await response.json()
    if(response.status === 200) {
      setToken(data)
      // decode token to obtain user details
      setUser(jwt_decode(data.access).name);
      localStorage.setItem("userName", jwt_decode(data.access).name)
      localStorage.setItem("userEmail", jwt_decode(data.access).email)
      navigate("/portal");
    } else {
      alert("Invalid Login")
      navigate("/login");
    }
    }

  function handleSubmit(event) {
    event.preventDefault();
    setToken(csrftoken)
    setFormData({
      email: "",
      password: "",
    })
    loginUser()
    }

  return (
    <div className="main-page">
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-div">
          <p>{props.loggedOut}</p>
          <h2>Login</h2>
          <input
            placeholder="Email"
            className="rf-input rf-parent-name"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required/>
          <input
            placeholder="Password"
            className="rf-input rf-parent-name"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required/>
          <button className='rf-submit'>Login</button>
      </div>
    </form>
    </div>
  )
}

export default Login
