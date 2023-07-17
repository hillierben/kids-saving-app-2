import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddChild() {
    const[formData, setFormData] = React.useState({
        childFirstName: "",
        childLastName: "",
        childUsername: "",
        childPassword: "",
        childConfirm: ""
    })

    const navigate = useNavigate()

    function registerChild() {
        fetch('http://127.0.0.1:8000/api/register-child/', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + String(localStorage.getItem("token"))
            },
            body: JSON.stringify({
                username: formData.childUsername,
                firstName: formData.childFirstName,
                lastName: formData.childLastName,
                password: formData.childPassword,
            })
        })
        window.location.reload()

    }

    function handleChange(event) {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(formData.childPassword !== formData.childConfirm) {
            alert("Passwords Do Not Match!")
        } else { 
        registerChild()
        }
    }

    return (
        <div className=''>
            <h3 className='text-black mx-4 p-0' >Add Child</h3>
            <form className='rf-form' onSubmit={handleSubmit}>
                <div className="rf-child-input">
                    <input 
                    placeholder="First Name"
                    className="rf-input rf-child-name"
                    type="text"
                    id="child-first-name"
                    name="childFirstName"
                    value={formData.childFirstName}
                    onChange={handleChange}
                    required/>
                    <input 
                    placeholder="Last Name"
                    className="rf-input rf-child-name"
                    type="text"
                    id="child-last-name"
                    name="childLastName"
                    value={formData.childLastName}
                    onChange={handleChange}
                    required/>
                    <input 
                    placeholder="Child Username"
                    className="rf-input rf-child-username"
                    type="text"
                    id="child-username"
                    name="childUsername"
                    value={formData.childUsername}
                    onChange={handleChange}
                    required/>
                    <input 
                    placeholder="Child Password"
                    className="rf-input rf-child-password"
                    type="password"
                    id="child-password"
                    name="childPassword"
                    value={formData.childPassword}
                    onChange={handleChange}
                    required/>
                    <input 
                    placeholder="Confirm Password"
                    className="rf-input rf-child-confirm-password"
                    type="password"
                    name="childConfirm"
                    onChange={handleChange}
                    value={formData.childConfirm}
                    required/>
                    <button className='rf-submit'>Register</button>
                </div>
            </form>
        </div>
  )
}
