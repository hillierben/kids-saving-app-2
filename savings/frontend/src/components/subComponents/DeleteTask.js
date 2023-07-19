import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import Popup from './Popup';

const DeleteTask = (props) => {
    const[deleteID, setDeleteID] = useState()
    const[isOpen, setIsOpen] = useState(false)

    let deleteTask = async () => {
        let taskDelete = deleteID
        let response = await fetch(`http://127.0.0.1:8000/api/edit-task/${taskDelete}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        let data = await response.json()
        props.getTasks()
    }

    function handleDelete(e) {
           
        deleteTask()
    }
    
    return (
        <>
           <Popup isOpen={isOpen} close={() => setIsOpen(false)} handle={handleDelete}>
                Are you sure you want to DELETE this task?
            </Popup>
            <FontAwesomeIcon 
                icon={faTrashCan}
                className='icon-margin hover:cursor-pointer'
                size="xl" 
                name="delete" 
                style={{color:"#ffdd00",}}
                onClick={() => 
                    {setDeleteID(props.taskID);
                    setIsOpen(true)}}/>


        </>
    )
}

export default DeleteTask
