import { Modal } from 'antd'
import React from 'react'
import Popup from './subComponents/Popup'
import { useState } from 'react'
import Button from './subComponents/Button'





const Dashboard = () => {
  const[isOpen, setIsOpen] = useState(false)

  return (
    <div className="dashboard-page">
      Kids Dashboard
      <Button name="Big Button" />
      <button className={"btn btn-danger"}>New Button</button>

    </div>
  )
}

export default Dashboard
