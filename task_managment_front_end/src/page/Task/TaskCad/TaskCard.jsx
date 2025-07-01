import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../UserList';
import SubmissionList from './SubmissionList';
import EditTaskForm from './EditTaskForm';

const role = "ROLE_ADMIN"

export const TaskCard = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  const [openUserList, setOpenUserList] = useState(false);
  const handleCloseUserList = () => {
    setOpenUserList(false);
  }
  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleMenuClose;

  }
  const [openSubmissionList, setSubmissionList] = useState(false);
  const handleCloseSubmissionList = () => {
    setSubmissionList(false);
  }
  const handleOpenSubmissionList = () => {
    setSubmissionList(true);
    handleMenuClose();
  };

  const [openUpdateTaskForm, setUpdateTaskForm] = useState(false);
  const handleCloseUpdateTask = () => {
    setUpdateTaskForm(false);
  }
  const handleOpenUpdateTask = () => {
    setUpdateTaskForm(true);
    handleMenuClose();
  }
  const handleDelete = () => {

  }



  return (
    <div>
      <div className='card lg:flex justify-between'>
        <div className='lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]'>
          <div className=''>
            <img className='lg:w-[30rem] lg:h-[7rem] object-cover'
              src="https://th.bing.com/th/id/OIP.fHJliRibftNeLVCXj7Mi4QHaE7?rs=1&pid=ImgDetMain" alt="" />

          </div>
          <div className='space-y-5'>
            <div className='space-y-2'>
              <h1 className='font-bold text-lg'> Car Rental Web</h1>
              <p className='text-gray-500 text sm'> use lastest frameworks and technology to make this website</p>
            </div>

            <div className='flex flex-wrap gap-2 items-center'>
              {
                [1, 1, 1, 1].map((item) => <span className='py-1 px-5 rounded-full techStack'>
                  Angular

                </span>)
              }
            </div>

          </div>

        </div>

        <div>
          <IconButton id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleMenuClick} >

            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            {
              role === "ROLE_ADMIN" ? <>
                <MenuItem onClick={handleOpenUserList}>Assined User</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
                <MenuItem onClick={handleOpenUpdateTask}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete </MenuItem>
              </> : <>
              </>
            }

          </Menu>

        </div>
      </div>
      <UserList open={openUserList} handleClose={handleCloseUserList} />
      <SubmissionList open={openSubmissionList} handleClose={handleCloseSubmissionList} />
      <EditTaskForm open={openUpdateTaskForm} handleClose={handleCloseUpdateTask}/>
    </div>
  );
}

export default TaskCard