import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../ReduxToolkit/AuthSlice';
import { useNavigate } from 'react-router-dom'; 
// import home from '../Home/Home'

export const Signin = ({ togglePanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await dispatch(login(formData));
  if (result.payload?.jwt) {
    navigate('/Home'); 

  }
};
 // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login(formData))
  //   console.log("login form", formData);
   
  // };
  return (
    <div>
      <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
      <form className='space-y-3' onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter your email'
        />

       
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter your password'
        />

        <div>
          <Button
            fullWidth
            className='customeButton'
            type='submit'
            sx={{ padding: ".9rem" }}
          >
            LOGIN
          </Button>
        </div>
      </form>

      <div className='mt-5 flex items-center gap-5 py-5 justify-center'>
        <span>Don't have an account?</span>
        <Button onClick={togglePanel}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Signin;
