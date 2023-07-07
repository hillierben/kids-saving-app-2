import React from 'react'
import { useState, useEffect } from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Moment from 'react-moment';
import { Button, Popconfirm, Input } from "antd";
import styles from "../App.css"

const Tasks = () => {
    const navigate = useNavigate()
    let[tasks, setTasks] = useState([])
    const[formData, setFormData] = useState({
        task: "",
        amount: "",
        })
    const[selectedTask, setSelectedTask] = useState()
    const[editContent, setEditContent] = useState({})
    const[completeID, setCompleteID] = useState()
    const[deleteID, setDeleteID] = useState()


    const{ token, setUser, setToken, user } = useContext(TokenContext)

    let getTasks = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/get-tasks/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(token.access)
            }
        })
        let data = await response.json()
        if(response.status === 200) {
            setTasks(data)
        } else {
            setUser(null)
            setToken(null)
            localStorage.removeItem("userName")
            localStorage.removeItem("userEmail");
            navigate("/login")
        }
    }

    let addTask = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/add-task/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(token.access)
            },
            body: JSON.stringify({
                "task": formData.task,
                "amount": formData.amount,
                // "user": user,
            })
        })
        let data = await response.json()
        if(response.status === 200) {
            setFormData({
                task: "",
                amount: "",
            })
            getTasks()
        }
    }

    let deleteTask = async () => {
        let taskDelete = deleteID
        let response = await fetch(`http://127.0.0.1:8000/api/edit-task/${taskDelete}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.access
            }
        })
        let data = await response.json()
        getTasks()
    }


    // HANDLE FUNCTIONS

    function handleSubmit(e) {
        e.preventDefault();
        // alert(`task: ${formData.task}, amount: ${formData.amount}`)
        addTask()
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
        }

    function handleDelete(e) {
        e.preventDefault()    
        deleteTask()
    }

    function handleEditButton(e) {
        e.preventDefault()
        setSelectedTask(e.target.value)
        
        // Fetch data for specific task
        let getSingleTask = async() => {
            let response = await fetch(`http://127.0.0.1:8000/api/get-single-task/${e.target.value}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.access,
                }
            })
            let data = await response.json()
            setEditContent({
                task: data.task,
                amount: data.amount,
            })
        }
        getSingleTask()
    }

    function handleEdit(e) {
        let submitEdit = async() => {
            let response = await fetch(`http://127.0.0.1:8000/api/edit-task/${selectedTask}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.access,
                },
                body: JSON.stringify({
                    "id": e.target.id.value,
                    "task": e.target.task.value,
                    "amount": e.target.amount.value,
                    "created": e.target.created.value,
                    "complete": e.target.complete.value,
                    "user": e.target.user.value,
                }) 
            })
            // let data = await response.json()
        }
        submitEdit()
        setSelectedTask("")
        getTasks()
    }

    function handleEditing(e) {
        const{name, value} = e.target
        setEditContent(prevContent => ({
            ...prevContent,
            [name]: value,
        }))
    }

    function handleComplete(e) {
        alert(completeID)
    }

    useEffect(() => {
        getTasks()
    }, [])

    
    const taskList = () => {
        return (
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {Number(selectedTask) === Number(task.id) ? 
                             <form id="editForm" onSubmit={e => handleEdit(e)}>
                             <input 
                                 type="text" 
                                 name="task"
                                 value={editContent.task}
                                 onChange={handleEditing}
                                 required
                                 placeholder='Task'
                             />
                             <input 
                                 type="number" 
                                 name="amount"
                                 step="0.10"
                                 value={editContent.amount}
                                 onChange={handleEditing}
                                 required
                                 placeholder='Amount(£0.00)'
                             />
                             <input hidden name="id" value={task.id} readOnly/>
                             <input hidden name="created" value={task.created} readOnly/>
                             <input hidden name="complete" value={task.complete}readOnly/>
                             <input hidden name="user" value={task.user} readOnly/>
                             <button type="submit" name="edit" value={task.id}>Save</button>
                         </form>
                            // : <p>{task.task} £{task.amount} <Moment format="hh:mm : DD/MM/YY" withTitle date={task.created}/></p>}
                            : <p>{task.task} £{task.amount}</p>}
                        
                        {Number(selectedTask) === Number(task.id) ? <p></p> : <button name="edit" value={task.id} onClick={e => {handleEditButton(e)}}>Edit</button>}
                        
                        <Popconfirm title="Are you sure you want to delete this task?" onConfirm={handleDelete}>
                            <button name="delete" value={task.id} onClick={() => setDeleteID(task.id)}>Delete</button>
                        </Popconfirm>
                        
                        <Popconfirm title="Are you sure you want to complete this task?" onConfirm={handleComplete}>
                            <button type="submit" name="delete" value={task.id} onClick={()=>setCompleteID(task.id)}>Complete</button>
                        </Popconfirm>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            <div className='portal-addtask'>
            <h1>Add Task Here</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    required
                    placeholder='Task'
                />
                <input 
                    type="number" 
                    name="amount"
                    step="0.10"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    placeholder='Amount(£0.00)'
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
        <div className="portal-tasklist">
            <h1>Tasks</h1>
            {taskList()}
        </div>
        </div>
    )
}

export default Tasks
