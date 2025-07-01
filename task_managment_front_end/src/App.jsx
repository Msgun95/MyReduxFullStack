
import { ThemeProvider } from "@mui/material";

import { darkTheme } from "./theme/darkTheme";
import './App.css'
import Navbar from "./page/navbar/navbar";
import Home from "./page/Home/Home";
import Auth from "./page/Auth/Auth";

import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";

import store from "./ReduxToolkit/Store"
import { getUserProfile } from "./ReduxToolkit/AuthSlice";
import { fetchTasks } from "./ReduxToolkit/TaskSlice";

 
function App() {

  const user =true;
 
 const dispatch = useDispatch();
//  const { task, auth } = useSelector(Store => store)
 const task = useSelector(state => state.task)
const auth = useSelector(state => state.auth)



  useEffect (()=>{
    dispatch(fetchTasks({}))
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")))
  }, [auth.jwt]);



  return (
    <ThemeProvider theme ={darkTheme}>
      {auth.user? <div>

        <Navbar/> 
        <Home/> 
        {/* <Route path="/home" element={<Home />} /> */}
      </div> :
      <Auth/>
      }

      


   
    </ThemeProvider>
  )
}

export default App;
