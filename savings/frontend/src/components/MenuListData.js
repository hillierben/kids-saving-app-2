import React from 'react'
import { NavLink } from "react-router-dom";
import TokenContext from '../contexts/Token';
import { useContext } from 'react';

const MenuListData = (props) => {
  const{user, role} = useContext(TokenContext)
  const navPage = localStorage.getItem("pageDisplay")

  console.log(user)
  

  return (
    <div>
        <ul className={props.className}>
            {navPage === "DASHBOARD" && <li className="nav-list-link"><NavLink to={"/dashboard"} className="nav-list-link">Dashboard</NavLink></li>}
            {navPage === "PORTAL" && <li className="nav-list-link"><NavLink to={"/portal"} className="nav-list-link">Parent Portal</NavLink></li>}
            <li className="nav-list-link"><NavLink to={"/register"} className="nav-list-link">Register</NavLink></li>
            {!user ? <li className="nav-list-link"><NavLink to={"/login"} className="nav-list-link">Login</NavLink></li> :
            <li onClick={() => props.handleLogout()} className="nav-list-link">Logout</li>}
        </ul>
        
    </div>
  )
}

export default MenuListData

