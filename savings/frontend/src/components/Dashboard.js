import React from 'react'
import { useState } from 'react'
import ChildTasks from './subComponents/ChildTasks'
import TotalSaved from './subComponents/TotalSaved'


const Dashboard = () => {
  const[isOpen, setIsOpen] = useState(false)

  return (
    <>
     <div className='h-24 bg-slate-400'></div>
        <div className='pb-2 pr-9 text-center bg-slate-400'>
          <h1>Hello, {localStorage.getItem("userName")}!</h1> 
        </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] bg-slate-400 border-white border-3'>
        <div className=' border-4 w-[380px] m-2 justify-self-end max-[766px]:justify-self-center'>
          <TotalSaved/>
        </div>
        <div className=' border-4 w-[380px] m-2 justify-self-start max-[766px]:justify-self-center'>
          <ChildTasks/>
        </div>
      </div>
      </>
  )
}

export default Dashboard
