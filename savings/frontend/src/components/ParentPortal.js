import React from 'react'
import { Navigate } from 'react-router-dom'
import Tasks from './Tasks'
import AddChild from './subComponents/AddChild'
import ChildList from './subComponents/ChildList'
import TotalSaved from './subComponents/TotalSaved'


const ParentPortal = () => {
  const[parentLogged] = React.useState(localStorage.getItem("userName"))
  const[addChildForm, setAddChildForm] = React.useState(false)


  return (
    <div className='background'>
      <div className='h-24 '></div>
      { parentLogged === null ? <Navigate to="/login"/> : 
        <div className='pb-2 pr-9 text-center '>
          <h1>Hello, {parentLogged}!</h1> 
        </div>}

      <div className=''>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] justify-items-center'>
          <div className=' border-w rounded-md m-2 w-[380px] justify-self-end max-[766px]:justify-self-center'>
            <div className='flex border-2 border-white  py-2 flex-wrap bg-[#c143a8] rounded-md shadow-lg'>
              <ChildList />
              <div className='w-[360px] '>
                <TotalSaved/>
              </div>
            </div>
            <div className=' grid mt-5 bg-[#c143a8] border-2 border-white  pt-2 shadow-lg rounded-md'>  
              <button className='text-black mx-4 p-1 mb-2 border-2 w-[50%] 
                                text-xl shadow-md bg-slate-300/[.3] place-self-center
                                active:border-slate-800 hover:bg-slate-300' 
                onClick={() => setAddChildForm(prev => !addChildForm)}
                >Add Child</button>            
              {addChildForm && <AddChild />}
            </div>
          </div>
          <div className='bg-[#c143a8] border-2 border-white p-2 shadow-md rounded-md m-2 w-[380px] justify-self-start max-[766px]:justify-self-center max-h-[630px]'>
              { parentLogged === null ? <Navigate to="/login"/> : <Tasks/> }
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ParentPortal
