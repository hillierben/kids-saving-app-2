import React from 'react'
import ChildTasks from './subComponents/ChildTasks'
import TotalSaved from './subComponents/TotalSaved'


const Dashboard = () => {

  return (
    <div className='background'>
     <div className='h-24 background'></div>
        <div className='pb-2 text-center'>
          <h1>Hello, {localStorage.getItem("userName")}!</h1> 
        </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] '>
        <div className=' w-[380px] m-2 justify-self-end max-[766px]:justify-self-center'>
          <TotalSaved/>
        </div>
        <div className='  h-[500px] w-[380px] m-2 justify-self-start max-[766px]:justify-self-center'>
          <ChildTasks/>
        </div>
      </div>
      </div>
  )
}

export default Dashboard
