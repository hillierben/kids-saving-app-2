import React from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Tasks from './Tasks'
import AddChild from './subComponents/AddChild'
import ChildList from './subComponents/ChildList'
import jwt_decode from "jwt-decode";
import TotalSaved from './subComponents/TotalSaved'


const ParentPortal = () => {
  const{user, token} = useContext(TokenContext)
  const[parentLogged] = React.useState(localStorage.getItem("userName"))


  return (
    <div className='bg-slate-400'>
      <div className='h-24 '></div>
      { parentLogged === null ? <Navigate to="/login"/> : 
        <div className='pb-2 pr-9 text-center '>
          <h1>Hello, {parentLogged}!</h1> 
        </div>}

      <div className=''>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] justify-items-center'>
          <div className=' bg-white border-4 m-2 w-[380px] justify-self-end max-[766px]:justify-self-center'>
            <div className='flex flex-wrap'>
              <ChildList />
              <TotalSaved/>
            </div>
            <div className='mt-5 border-4'>
              <AddChild />
            </div>
          </div>
          <div className='bg-white border-4 m-2 w-[380px] justify-self-start max-[766px]:justify-self-center'>
              { parentLogged === null ? <Navigate to="/login"/> : <Tasks/> }
          </div>
        </div>
      </div>
    </div>
  )
} 

export default ParentPortal
