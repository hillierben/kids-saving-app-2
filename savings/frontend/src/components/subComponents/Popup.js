import React from 'react'
import { ReactDOM } from 'react'
import { createPortal } from 'react-dom'

const Popup = ({isOpen, close, children, handle}) => {

    if(!isOpen) return null

    const POP_BOX = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%",
        backgroundColor: "white",
        width: "300px",
        height: "300px",
        paddingLeft: "1%",
        paddingRight: "1%",
        paddingTop: "1%",
        border: "solid",
        textAlign: "center",
        fontSize: "30px",
        borderRadius: "10px",
        zIndex: 1000,
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
            <div className='mt-[14%]'>
                <button 
                    onClick={close} 
                    className='p-2 px-3 mr-3 rounded-lg shadow-md bg-red-500 text-slate-100 hover:bg-red-400'
                    >No
                </button>
                <button 
                    onClick={() => {close(); handle()}} 
                    className='p-2 px-3 ml-3 rounded-lg shadow-md bg-green-600 text-slate-100 hover:bg-green-400'
                    >Yes
                </button>
            </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default Popup
