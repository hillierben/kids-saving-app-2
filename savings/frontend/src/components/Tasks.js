import React from 'react'
import { useState, useEffect } from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import CompleteTask from './subComponents/CompleteTask'
import DeleteTask from './subComponents/DeleteTask'

const Tasks = () => {
    const navigate = useNavigate()
    let[tasks, setTasks] = useState([])
    const[formData, setFormData] = useState({
        task: "",
        amount: "",
        })
    const[selectedTask, setSelectedTask] = useState()
    const[editContent, setEditContent] = useState({})

    const{ token, setUser, setToken, user } = useContext(TokenContext)

    let getTasks = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/get-tasks/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(localStorage.getItem("token"))
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
                "Authorization": "Bearer " + String(localStorage.getItem("token"))
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

    function handleEditButton(e) {
        e.preventDefault()
        setSelectedTask(e.target.value)
        
        // Fetch data for specific task
        let getSingleTask = async() => {
            let response = await fetch(`http://127.0.0.1:8000/api/get-single-task/${e.target.value}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
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
                    "Authorization": "Bearer " + localStorage.getItem("token"),
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

    useEffect(() => {
        getTasks()
    }, [])
    
    const taskList = () => {

        return (
            <ul className='portal-list'>
                {tasks.map(task => (
                    <li key={task.id}  >
                        {Number(selectedTask) === Number(task.id) ? 
                             <form 
                                id="editForm" 
                                onSubmit={e => handleEdit(e)}
                                className='portal-form'>
                             <input 
                                 type="text" 
                                 name="task"
                                 value={editContent.task}
                                 onChange={handleEditing}
                                 required
                                 placeholder='Task'
                                 className='form-control portal-input'
                             />
                             <input 
                                 type="number" 
                                 name="amount"
                                 step="0.10"
                                 value={editContent.amount}
                                 onChange={handleEditing}
                                 required
                                 placeholder='Amount(£0.00)'
                                 className='form-control portal-input'
                             />
                             <input hidden name="id" value={task.id} readOnly/>
                             <input hidden name="created" value={task.created} readOnly/>
                             <input hidden name="complete" value={task.complete}readOnly/>
                             <input hidden name="user" value={task.user} readOnly/>
                             <button 
                                type="submit" 
                                name="edit" 
                                value={task.id}
                                className='btn btn-info btn-margin btn-sm'
                                >Save
                            </button>
                         </form>
                            // : <p>{task.task} £{task.amount} <Moment format="hh:mm : DD/MM/YY" withTitle date={task.created}/></p>}
                            : <p className={task.complete ? "strike" : ""}>
                                    {task.task} £{task.amount}
                                </p>}
                        
                        {Number(selectedTask) === Number(task.id) ? <p></p> : task.complete == false ?
                             <button 
                                name="edit" 
                                value={task.id} 
                                onClick={e => {handleEditButton(e)}}
                                className='btn btn-light btn-sm btn-margin '
                                >Edit
                            </button> : <p></p>}
                        <DeleteTask token={token} taskID={task.id} getTasks={getTasks}/>
                        <CompleteTask task={task} getTasks={()=>getTasks()}/>
                        <div className='linebreak'></div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div>
            <div className='portal-addtask'>
            <h1>Add Task Here</h1>
            <form onSubmit={handleSubmit} className='portal-form'>
                <input 
                    type="text" 
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    required
                    placeholder='Task'
                    className='form-control portal-input'
                />
                <input 
                    type="number" 
                    name="amount"
                    step="0.10"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    placeholder='Amount(£0.00)'
                    className='form-control portal-input'
                />
                <button type="submit" className='btn btn-light btn-sm btn-margin'>Add Task</button>
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
