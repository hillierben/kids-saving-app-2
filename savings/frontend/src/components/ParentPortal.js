import React from 'react'
import TokenContext from '../contexts/Token'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Tasks from './Tasks'

const ParentPortal = () => {
  const{user} = useContext(TokenContext)
  const[parentLogged] = React.useState(localStorage.getItem("userName"))

  return (
    <div className="portal-main-page">
      { user === null ? <Navigate to="/login"/> : 
      <h1 className='portal-hello'>Hello, {parentLogged}!</h1> }
      {user === null ? <Navigate to="/login"/> : <Tasks/> }
    </div>
  )
}

export default ParentPortal
