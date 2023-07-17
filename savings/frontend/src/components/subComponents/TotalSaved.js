import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import TokenContext from '../../contexts/Token'

export default function TotalSaved() {
    const[totalSaved, setTotalSaved] = useState("...")

    const{ role, childId, changed } = useContext(TokenContext)

    let getTotalSaved = async() => {
        let response = await fetch("http://127.0.0.1:8000/api/get-total/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(localStorage.getItem("token"))
            }
        })
        let data = await response.json()
        setTotalSaved(data.toFixed(2))
    }

    let childTotalSaved = async() => {
        console.log(childId)
        if(!childId) {
            setTotalSaved(0);
            return 0;
        }

        let response = await fetch("http://127.0.0.1:8000/api/get-total/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(localStorage.getItem("token"))
            },
            body: JSON.stringify ({
                child: childId,
            })
        })
        let data = await response.json()
        setTotalSaved(data.toFixed(2))
    }

    useEffect(() => {
        if(localStorage.getItem("userProfile") === "CHILD") {
            getTotalSaved()
        } else if(localStorage.getItem("userProfile") === "PARENT") {
            childTotalSaved()
        } else {
            console.log("No role!")
        }
    }, [childId, changed])


    return (
        <div className=''>
        <div className=''>
            {role === "CHILD" ? <h3 className=' text-4xl '>You have saved...</h3> :
                <h3 className=' text-4xl '>Total saved...</h3>}
        </div>
        <div className='row-start-2 col-start-2 place-self-center '>
                <h1 className='m-0 text-4xl'>£{totalSaved}</h1>
            </div>
        </div>
    )
}
