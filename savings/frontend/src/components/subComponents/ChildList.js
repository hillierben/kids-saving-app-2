import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import TokenContext from '../../contexts/Token';

export default function ChildList() {
    const[children, setChildren] = useState();
    const[selectedChild, setSelectedChild] = useState("")

    const{ childId, setChildId} = useContext(TokenContext)

    let getChildren = async() => {
        let response = await fetch(`http://127.0.0.1:8000/api/get-children/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        let data = await response.json()
        if(response.status === 200) {
            setChildren(data)
        }
    }
    
    useEffect(() => {
        getChildren()
    }, [])

    

    return (
        <div>
            <div className='grid '>
                <ul className='flex w-[320px] place-content-center ml-3'>
                    {children && children.map(child => (
                        <li className="mx-2 cursor-pointer text-[#000000ad]
                                text-xl hover:text-slate-100 hover:underline" 
                            key={child.id} onClick={() => {setChildId(child.id); localStorage.setItem("selectedChild", child.name)}}>{child.name}</li>
                    ))}
                </ul>
                <div className='flex max-w-[120px] ml-10 place-self-center '>
                    <p className="mx-2 cursor-pointer 
                                text-4xl text-yellow-300 hover:underline " >
                        {localStorage.getItem("selectedChild")}
                    </p>
                </div>
            </div>
        </div>
    )
}
