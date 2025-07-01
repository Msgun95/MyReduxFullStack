import React, { useState } from 'react';
import "./Auth.css";
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const togglePanel = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>
      <div className='box lg:max-w-4xl'>
        {/* The flipping “cover” */}
        <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
          <div className='front'>
            <img
              src='https://th.bing.com/th/id/OIP.qNn2dBfrvFki22NV4IMR1QHaEK?rs=1&pid=ImgDetMain'
              alt=''
            />
            <div className='text'>
              <span className='text-1'>
                Success is built upon well-organized tasks
              </span>
              <span className='text-2 text-xs'>Let's get connected</span>
            </div>
          </div>
          <div className='back'>
            <img
              src='https://gch-services.com/wp-content/uploads/2018/12/shutterstock_1028121619.jpg'
              alt=''
            />
          </div>
        </div>

        {/* The form area */}
        <div className='forms h-full'>
          <div className='form-content h-full'>
            <div className='login-form'>
              <Signin togglePanel={togglePanel} />
            </div>
            <div className='signup-form'>
              <Signup togglePanel={togglePanel}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
