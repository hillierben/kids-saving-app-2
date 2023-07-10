import React from 'react'
import { ReactDOM } from 'react'
import { createPortal } from 'react-dom'

const Popup = ({isOpen, close, children}) => {

    if(!isOpen) return null

    const POP_BOX = {
        position: "fixed",
        top: "100px",
        display: "inline-block",
        width: "200px",
        height: "300px",
        top: "30%",
        left: "50%",
        border: "solid",
        textAlign: "center",
        fontSize: "50px",
        zIndex: 1000,
        backgroundColor: "white"
    }

    const OVERLAY = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 1000,
    }
        
    return createPortal (
        <>
            <div style={OVERLAY} />
            <div style={POP_BOX}>
            {children}
            <button onClick={close}>Close</button>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default Popup
