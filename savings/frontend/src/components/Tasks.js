import React from 'react'
import { useState, useEffect } from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import CompleteTask from './subComponents/CompleteTask'
import DeleteTask from './subComponents/DeleteTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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

    function handleEditButton(id) {
        // e.preventDefault()
        setSelectedTask(id)
        
        // Fetch data for specific task
        let getSingleTask = async() => {
            let response = await fetch(`http://127.0.0.1:8000/api/get-single-task/${id}/`, {
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
            <ul className='portal-list max-h-[26rem] overflow-scroll shadow-sm'>
                {tasks.map(task => (
                    <li key={task.id}  className='shadow-md bg-slate-50 mb-2 p-2 w-auto max-w-xl min-w-min rounded-lg flex group hover:bg-[#40c6b8]/[.3]  '>
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
                                className='px-2 shadow-sm border rounded-lg bg-yellow-300'
                                >Save
                            </button>
                         </form>
                        : 
                        <section className='flex flex-wrap'>
                            <div className='flex flex-nowrap'>
                                <div className=' rounded-md m-2 flex items-center '>
                                    <input className={task.complete ? "portal-strike flex py-2 px-2 rounded-md bg-slate-50" : "flex py-2 px-2 rounded-md bg-slate-50"} name="id" value={task.task} readOnly/>
                                </div>
                                <div className=' rounded-md m-2 px-1  flex items-center '>
                                    <input className={task.complete ? "portal-strike py-2 px-2 rounded-md w-20 bg-slate-50" : "py-2 px-2 rounded-md w-20 bg-slate-50"} name="id" value={`£${task.amount}`} readOnly/>
                                </div>
                            </div>
                            <div className=' group-hover:flex  pt-[6px] hidden space-x-3 max-md:ml-[3%]  '>
                                {Number(selectedTask) === Number(task.id) ? <p></p> : task.complete == false ?
                                    <FontAwesomeIcon icon={faPenToSquare} className='fa-2x icon-margin' onClick={() => {handleEditButton(task.id)}} value={task.id} name="edit" />
                                    : <p></p>}
                                <DeleteTask token={token} taskID={task.id} getTasks={getTasks}/>
                                <CompleteTask task={task} getTasks={()=>getTasks()}/>
                            </div>
                        </section>
                        }
                        <div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div >
            <div className='m-auto w-5/6 rounded-lg  p-2 my-4'>
            <h1 className='text-2xl'>Add Task Here</h1>
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
                    placeholder='Amount(£)'
                    className='form-control portal-input-amount'
                />
                <button type="submit" className=' rounded-md bg-slate-50  px-3 border hover:bg-[#40c6b8]/[.3]'>Add Task</button>
            </form>
        </div>
        <div className='m-auto w-5/6 rounded-lg p-2 my-2'>
            <h1 className='text-2xl'>Tasks</h1>
            {taskList()}
        </div>
        </div>
    )
}

export default Tasks
