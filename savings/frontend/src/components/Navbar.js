import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import MenuListData from "./MenuListData";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import TokenContext from "../contexts/Token";

const Navbar = (props) => {
    const[hideLinks, setHideLinks] = React.useState("show");
    const[menuClick, setMenuClick] = React.useState(false);
    const[showSidebar, setShowSidebar] = React.useState("hide");
    const{token, setToken, user, setUser, role, setRole, setChildId} = useContext(TokenContext);

    const navigate = useNavigate()

    function handleLogout() {
        setUser(null)
        setToken(null)
        setRole("")
        setChildId("")
        localStorage.removeItem("userName")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("token")
        localStorage.removeItem("pageDisplay")
        localStorage.removeItem("selectedChild")
        localStorage.removeItem("totalSaved")
        alert("You have been logged out")
        return navigate("/login")

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

    // const mainPage = document.querySelector("side-bar")
    // mainPage.addEventListener("click", () => setShowSidebar("hide"))

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
            <nav className="side-bar">
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
