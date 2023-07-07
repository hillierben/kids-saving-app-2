import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import MenuListData from "./MenuListData";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import TokenContext from "../contexts/Token";

const Navbar = (props) => {
    const[hideLinks, setHideLinks] = React.useState("show");
    const[menuClick, setMenuClick] = React.useState(false);
    const[showSidebar, setShowSidebar] = React.useState("hide");
    const{token, setToken, user, setUser} = useContext(TokenContext);

    function handleLogout() {
        // // fetch('http://127.0.0.1:8000/api/logout/', {
        // // method: 'GET',
        // // headers: {
        // //   "Content-type": "application/json; charset=UTF-8",
        //   //'X-CSRFToken': token,
        // // },
        // // })
        // // props.handlePage("login")
        // // Clear Context variables and local storage
        setUser(null)
        setToken(null)
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        alert("You have been logged out")
        return <Navigate to="/login"/>
    }
    
    React.useEffect(() => {
        
        // Hide or show Nav Links
        function handleResize() {
            if(window.innerWidth < 940) {
                setHideLinks("hide")
            } else {
                setHideLinks("show")
                setShowSidebar("hide")
                setMenuClick(false)
            }
        }
        
        // Listen for window size change
        window.addEventListener("resize", handleResize);
        handleResize()
    }, [])

    function handleIconClick() {
        setShowSidebar(showSidebar === "hide" ? "show" : "hide")
    }

    return (
        <>
            <nav className="nav-bar">
                <FontAwesomeIcon 
                    icon={faBars} size="2xl" 
                    className={hideLinks === "show" ? "icon-fa-bar-hidden" : 
                        menuClick === false ? "icon-fa-bar" : "icon-fa-bar-open"} 
                    onClick={() => {handleIconClick(); setMenuClick(!menuClick)}}
                    />
                <h1 className={hideLinks ==="hide" ? "saving-logo-center" : "saving-logo"}>Saving Stars</h1>
                <MenuListData 
                    className={hideLinks=== "show" ? "nav-list" : "nav-list-hidden"}
                    handlePage={props.handlePage}
                    handleLogout={handleLogout}
                    />
            </nav>
            <nav>
                <Sidebar 
                    className={showSidebar === "show" ? "sidebar-div" : "sidebar-div-hidden"}
                    handlePage={props.handlePage}
                    handleClick={() => {handleIconClick(); setMenuClick(false)}}
                    handleLogout={handleLogout}
                    />
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar
