import React from 'react'
import { NavLink } from "react-router-dom";
import TokenContext from '../contexts/Token';
import { useContext } from 'react';

const Sidebar = (props) => {
  const{user, role} = useContext(TokenContext)
  const navPage = localStorage.getItem("pageDisplay")

  return (
    <div className={props.className}>
      <ul className="sidenav-list">
            {navPage === "DASHBOARD" && <li onClick={() => props.handleClick()}><NavLink to={"/dashboard"} className="nav-list-link">Dashboard</NavLink></li>}
            {navPage === "PORTAL" && <li onClick={() => props.handleClick()}><NavLink to={"/portal"} className="nav-list-link">Parent Portal</NavLink></li>}
            <li onClick={() => props.handleClick()}><NavLink to={"/register"} className="nav-list-link">Register</NavLink></li>
            {user === null ? <li onClick={() => props.handleClick()}><NavLink to={"/login"} className="nav-list-link">Login</NavLink></li> :
            <li onClick={() => {props.handleLogout(); props.handleClick()}}>Logout</li> }
        </ul>
        
    </div>
  )
}

export default Sidebar
