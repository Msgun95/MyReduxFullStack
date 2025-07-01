import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import "./sidebar.css"
import CreateNewTaskForm from '../Task/CreateTask'
import { useLocation, useNavigate } from 'react-router-dom'


const menu = [
  {name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"]},
  {name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"]},
  {name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"]},
  {name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"]},
  {name: "Create New Task", value: "", role: ["ROLE_ADMIN"]},
  {name: "NOTIFICATION", value: "NOTIFICATION", role: ["ROLE_ADMIN"]},


]
const role = "ROLE_ADMIN"





export const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeMenu, setActiveMenu ] = useState("DONE")

  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTask = () => {
    setOpenCreateTaskForm(false);
  }
  const handleOpenCreateTaskModel = () => {
    setOpenCreateTaskForm(true);
   
  }



  const handleMenuChange =(item)=>{
    const updateParams = new URLSearchParams(location.search);

    
    if(item.name=="Create New Task"){
      handleOpenCreateTaskModel( )

    }
    else if (item.name=="Home"){
      updateParams.delete("filter");
      const querystring = updateParams.toString();
      const updatePath =querystring?`${location.pathname}?${querystring}`
      :location.pathname;
      navigate(updatePath);


    }
    else{
      updateParams.set("filter", item.value);
      navigate(`${location.pathname}?${updateParams.toString()}`);

    }
    setActiveMenu(item.name)
  }
  const handleLogout =()=>{
    console.log("logout")
  }

  return (
  <>

 
      
     <div className='card h-screen flex flex-col justify-center fixed w-[20vw]
      '> 
      <div className='space-y-5 h-full'>
        <div className='flex justify-center'>
          <Avatar
          sx={{width: "8rem", height:"8rem"}} 
          className='border-2 border-[#c24dd0]'
          src='https://image.isu.pub/230216100327-8e7cda07841278c70372476aac3e1f60/jpg/page_1.jpg'/>
          {/* </Avatar> */}
        </div>
        {
          menu.filter((item)=>item.role.includes(role))
          .map((item)=><p onClick={()=>handleMenuChange(item)} className={`py-3 px-5 rounded-full text-center
             cursor-pointer ${activeMenu===item.name?"activeMenuItem":"menuItem"}`}>
            {item.name}
          </p>)
        }

<Button onClick={handleLogout} sx={{padding: ".7rem", borderRadius:"2rem"}} fullWidth className='logoutButton' >
  logout
</Button>

      </div>

    </div>

          <CreateNewTaskForm open={openCreateTaskForm} handleClose={handleCloseCreateTask}/>
    </>
  )
}

export default Sidebar;


// <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[20vw] overflow-y-auto'>