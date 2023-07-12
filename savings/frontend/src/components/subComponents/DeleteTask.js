import React from 'react'
import { useState } from 'react'
import { Popconfirm } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DeleteTask = (props) => {
    const[deleteID, setDeleteID] = useState()

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
        e.preventDefault()    
        deleteTask()
    }
    
    return (
        <>
            <Popconfirm title="Are you sure you want to delete this task?" onConfirm={handleDelete} style={{POP_STYLE}}>
            <FontAwesomeIcon icon={faTrash} className='fa-2x icon-margin' name="delete" onClick={() => setDeleteID(props.taskID)}/>
                {/* <button 
                    name="delete" 
                    value={props.taskId} 
                    onClick={() => setDeleteID(props.taskID)}
                    className='btn btn-danger btn-sm btn-margin'
                    >Delete
                </button> */}
            </Popconfirm>
        </>
    )
}

export default DeleteTask