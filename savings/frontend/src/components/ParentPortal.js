import React from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Tasks from './Tasks'
import AddChild from './subComponents/AddChild'
import ChildList from './subComponents/ChildList'
import jwt_decode from "jwt-decode";


const ParentPortal = () => {
  const{user, token} = useContext(TokenContext)
  const[parentLogged] = React.useState(localStorage.getItem("userName"))


  return (
    <div className='bg-slate-400'>
      <div className='h-24 '></div>
      { parentLogged === null ? <Navigate to="/login"/> : 
        <div className=' w-full pl-[9%] pb-2 '>
          <h1>Hello, {parentLogged}!</h1> 
        </div>}
      <div className='grid grid-cols-[repeat(auto-fill,minmax(100px,500px))] gap-2 pb-4  justify-center '>
        <div className=''>
          <div className='m-2 shadow bg-white'>
            <ChildList />
          </div>
        </div>
        <div className='row-span-3'>
          <div className='m-2  shadow bg-white'>
            { parentLogged === null ? <Navigate to="/login"/> : <Tasks/> }
          </div>
        </div>
        <div className=' m-2 row-span-2 shadow bg-white'>
          <AddChild />
        </div>
      </div>
    </div>
  )
} 

export default ParentPortal
