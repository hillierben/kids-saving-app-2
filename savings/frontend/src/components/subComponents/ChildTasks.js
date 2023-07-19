import React from 'react'
import { useEffect, useState } from 'react'

export default function ChildTasks() {
    const[tasks, setTasks] = useState()

    let getTasks = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/get-tasks/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(localStorage.getItem("token"))
            },
        })
        let data = await response.json()
        if(response.status === 200) {
            setTasks(data)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
            <div className='text-black bg-[#c143a8] border-2 border-slate-400 
                            pt-2 pr-5 shadow-md rounded-md m-2 w-[380px] 
                            justify-self-centerd '>
                <h3 className='grid place-content-center'>Tasks</h3>
                {tasks &&
                    <ul className='portal-list max-h-[26rem] overflow-auto scrollbar scrollbar-thumb-[#c143a880] scrollbar-track-[#48193f77]
                        shadow-sm min-w-[300px]'>
                        {tasks.map(task => (
                            <li key={task.id} 
                            className=''>
                                <section className='ml-6 flex flex-wrap'>
                                    <div className='flex flex-nowrap'>
                                        <div className=' rounded-md m-2 flex justify-self-center '>
                                            <input className={task.complete ? "portal-strike flex py-2 px-2 rounded-md bg-slate-50" : " py-2 px-2 rounded-md bg-slate-50"} name="id" value={task.task} readOnly/>
                                        </div>
                                        <div className=' rounded-md m-2 px-1  flex items-center '>
                                            <input className={task.complete ? "portal-strike py-2 px-2 rounded-md w-20 bg-slate-50" : "py-2 px-2 rounded-md w-20 bg-slate-50"} name="id" value={`£${task.amount}`} readOnly/>
                                        </div>
                                    </div>
                                </section>
                            </li>
                        ))}
                    </ul>
                    }
            </div>
    )
}
