import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import Grid2 from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const tags = ["Angular", "React", "VueJs", "Spring Boot", "NodeJs", "Python"]

export default function EditTaskForm({ handleClose, open }) {

  const [formData, setFormData] = useState({

    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date(),

  })

  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  }
  const handleTagsChange = (event, value) => {
    setSelectedTags(value);

  }

const handleDeadLineChanges =(date)=>{
  setFormData({
    ...formData,
    deadline:date
  })

}

const formateDate =(input)=>{
  let {
    $y: year,
    $M: month,
    $D: day,
    $H: hours,
    $m: minutes,
    $s: seconds,
    $ms: milliseconds,
 
  } =input;
  const date = new Date(year, month, day, hours, minutes, seconds, milliseconds)

  const formatedDate =date.toISOString();

  return formatedDate;
}

const handleSubmit=(e)=>{
e.preventDefault();
const {deadline}=formData;
formData.deadline =formateDate(deadline)
formData.tags = selectedTags
console.log("formData", formData, "deadline : ",formData.deadline); 
handleClose()

}

useEffect(()=>{

},[])

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2} alignItems="center">
              <Grid2 item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />

              </Grid2>

              <Grid2 item xs={12}>
                <Autocomplete
                  multiple
                  id="multiple-limit-tags"
                  options={tags}
                  onChange={handleTagsChange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField
                    label="Tags"
                    fullWidth
                    {...params}

                  />
                  }
                />


              </Grid2>

              <Grid2 item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  rows={4}
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                />

              </Grid2>

              <Grid2 item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    onChange={handleDeadLineChanges}
                    className='w-full' 
                    label="Deadthline"
                    renderInput={(params)=><TextField{...params}/>} />

                </LocalizationProvider>
              </Grid2>

              <Grid2 item xs={12}>
                <Button fullWidth
                className='customeButton'
                type='submit'
                sx={{padding:".9rem"}}>
                      UPDATE

                </Button>
                </Grid2>



            </Grid2>
          </form>

        </Box>
      </Modal>
    </div>
  );
}

