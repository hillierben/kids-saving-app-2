import React from 'react'
import { useState } from 'react'
import { Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Popup from './Popup';

const DeleteTask = (props) => {
    const[deleteID, setDeleteID] = useState()
    const[isOpen, setIsOpen] = useState(false)

    const POP_STYLE = {
        backgroundColor: "red",
    }

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
                icon={faTrash} 
                className='icon-margin'
                size="xl" 
                name="delete" 
                onClick={() => 
                    {setDeleteID(props.taskID);
                    setIsOpen(true)}}/>


        </>
    )
}

export default DeleteTask
