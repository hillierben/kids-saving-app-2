import React, { useEffect } from 'react'
import { useState } from 'react'
import { Popconfirm } from 'antd'
import { useContext } from 'react'
import TokenContext from '../../contexts/Token'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'




const CompleteTask = ({task, getTasks}) => {
    const[completeID, setCompleteID] = useState()
    const{token} = useContext(TokenContext)
    const[complete, setComplete] = useState()

    function handleComplete(e) {
        let completeTask = async (e)=>{
            let response = await fetch(`http://127.0.0.1:8000/api/edit-task/${completeID}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    "id": completeID,
                    "task": task.task,
                    "amount": task.amount,
                    "created": task.created,
                    "complete": complete,
                    "user": task.user,
                })
            })
            setComplete(prev=>(!prev))
        }
        completeTask(e)
    }
    
    useEffect(()=>{
        getTasks()
    },[complete])

    return (
        <>
            <Popconfirm title="Are you sure you want to complete this task?" onConfirm={handleComplete} >
                <FontAwesomeIcon icon={faSquareCheck} className='fa-2x icon-margin' style={{color: "#333333",}} onClick={()=>{setCompleteID(task.id); setComplete(!task.complete)}} />
            </Popconfirm>
        </>
    )
}

export default CompleteTask
