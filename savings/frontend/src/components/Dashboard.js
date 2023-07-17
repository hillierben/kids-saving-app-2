import { Modal } from 'antd'
import React from 'react'
import Popup from './subComponents/Popup'
import { useState } from 'react'
import Button from './subComponents/Button'





const Dashboard = () => {
  const[isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className='h-24'></div>
      <div className='grid grid-cols-4 gap-4 p-4 top-2'>
        <div className='bg-red col-span-2'>1</div>
        <div className='bg-red'>2</div>
        <div className='bg-red'>3</div>
        <div className='bg-red'>4</div>
        <div className='bg-red'>5</div>
        <div className='bg-red'>6</div>
        <div className='bg-red'>7</div>
        <div className='bg-red'>8</div>
      </div>

    </div>
  )
}

export default Dashboard
