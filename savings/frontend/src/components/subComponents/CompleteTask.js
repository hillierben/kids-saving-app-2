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
    const[complete, setComplete] = useState(false)

    function handleComplete(e) {
        console.log(task.complete)
        let complete = task.complete ? false : true
        console.log(complete)
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
            let data = await response.json()
        }
        completeTask(e)
        setComplete(prevComplete=>{
            return !prevComplete
        })
    }
    
    useEffect(()=>{
        getTasks()
    },[complete])

    return (
        <>
            <Popconfirm title="Are you sure you want to complete this task?" onConfirm={handleComplete}>
                <FontAwesomeIcon icon={faSquareCheck} className='fa-2x icon-margin' style={{color: "#333333",}} onClick={()=>setCompleteID(task.id)} />
                {/* <button
                    type="submit"
                    name="delete"
                    value={task.id}
                    onClick={()=>setCompleteID(task.id)}
                    className='btn btn-success btn-sm btn-margin'
                    >Complete
                </button> */}
            </Popconfirm>
        </>
    )
}

export default CompleteTask
