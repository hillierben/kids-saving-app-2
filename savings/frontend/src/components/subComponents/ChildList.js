import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import TokenContext from '../../contexts/Token';

export default function ChildList() {
    const[children, setChildren] = useState();

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
        <h3>Children</h3>
        <ul>
            {children && children.map(child => (
                <li key={child.id} onClick={() => setChildId(child.id)}>{child.name}</li>
            ))}
        </ul>
        </div>
    )
}
