import { Avatar } from '@mui/material'
import React from 'react'
import "./Navbar.css"

import {useDispatch, useSelector} from 'react-redux'

export const Navbar = () => {
   const task = useSelector(state => state.task)
const auth = useSelector(state => state.auth)
  return (
    <div className='container z-10 sticky left-0 right-0 top-0 py-3 px-5
    lg:px-10 flex justify-between items-center'>

    {/*  <div className='navbar w-full  z-10 sticky left-0 right-0 top-0 py-3 px-5
     lg:px-10 flex justify-between items-center'> */}
     
      <p className='font-bold text-lg'>
      MSGUN'S PAGE
      </p>
      <div className='flex item-center gap-5'>
        <p>{auth.user?.fullName}</p>
        {/* <Avatar src="https://swansoftwaresolutions.com/wp-content/uploads/2020/04/05.14.20-Meet-a-Full-Stack-Developer-Vlad-Ryba.jpg" >M</Avatar> */}
      {/* or we can use like this, and the image is in public */}
       <Avatar src="/navbarimage/msgun.JPG" >M</Avatar>
      </div>
     
    </div>
  )
}

export default Navbar
