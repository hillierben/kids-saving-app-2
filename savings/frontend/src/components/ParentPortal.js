import React from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Tasks from './Tasks'
import AddChild from './subComponents/AddChild'


const ParentPortal = () => {
  const{user} = useContext(TokenContext)
  const[parentLogged] = React.useState(localStorage.getItem("userName"))

  return (
    <div className='flex z-[-10] bg-gray-100 ml-[-25px] h-[52rem] bg-gradient-to-r from-pink-400 to-fuchsia-600'>
      <div className=" ml-auto mr-auto mt-[110px] w-auto md:max-2xl:min-w-[600px] ">
        { parentLogged === null ? <Navigate to="/login"/> : 
        <div className='m-auto w-5/6 rounded-lg p-2 my-2'>
          <h1>Hello, {parentLogged}!</h1> 
        </div>}
        <div className=''>
          { parentLogged === null ? <Navigate to="/login"/> : <Tasks/> }
        </div>
        <div className='bg-teal-600'>
          <AddChild />
        </div>
      </div>
    </div>
  )
} 

export default ParentPortal
