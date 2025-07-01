import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";
import axios from "axios";
import { data } from "react-router-dom";
import { Build } from "@mui/icons-material";

// this for admin
export const fetchTasks = createAsyncThunk("/task/fetchTasks",
  async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.get("/api/tasks", {
        params :{status}
      });
      console.log("fetch tasks data :", data)
        return data;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);

    }})

    // for users
export const fetchUsersTasks = createAsyncThunk("/task/fetchUsersTasks",
  async({status})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.get("/api/tasks/user", {
        params :{status}
      });
      console.log("fetch users tasks data :", data)
        return data;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);
  }
  });


  export const fetchTasksById = createAsyncThunk("/task/fetchTasksById",
  async(tasksId)=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.get(`/api/tasks/${tasksId}`);
            console.log("fetch tasks by Id :", data)
        return data;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);
  }
  });


   export const createTask = createAsyncThunk("/task/createTask",
  async(taskData)=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.post(`/api/tasks`, taskData);
            console.log("create tasks :", data)
        return data;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);
  }
  });


  export const updateTask = createAsyncThunk("/task/updateTask",
  async({taskId, updateTask})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.put(`/api/tasks/${taskId}`, updateTask);
            console.log("update task: ", data)
        return data;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);
  }
  });



  
  export const assignedTaskToUser = createAsyncThunk("/task/assignedTaskToUser",
  async({taskId, userId})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
            console.log("Assigned task: ", data)
        return data;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);
  }
  });


   export const deleteTask = createAsyncThunk("/task/deleteTask",
  async({taskId})=>{
    setAuthHeader(localStorage.getItem("jwt"), api)

    try{
      const{date} = await api.delete(`/api/tasks/${taskId}`);
            console.log("task deleted successfully: ")
        return taskId;
    }
    catch (error){
      console.log("error :", error)
      throw Error (error.response.data.error);
  }
  });


  const taskSlice = createSlice({
    name:"task",
    initialState:{
      tasks:[],
      loading:false,
      error : null,
      taskDetails:null,
      usersTask:[]
    }, 

    reducer :{},
    extraReducers:(Build)=>{
      Build
      .addCase(fetchTasks.pending,(state)=>{
        state.loading =true,
        state.error =null
      })
      .addCase(fetchTasks.fulfilled, (state, action)=>{
        state.loading=false,
        state.tasks =action.payload
      })
      .addCase(fetchTasks.rejected,(state, action)=>{
        state.error =action.error.message,
          state.loading=false

      } )




       .addCase(fetchUsersTasks.pending,(state)=>{
        state.loading =true,
        state.error =null
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action)=>{
        state.loading=false,
        state.usersTask =action.payload
      })
      .addCase(fetchUsersTasks.rejected,(state, action)=>{
        state.error =action.error.message,
          state.loading=false

      } )



       .addCase(createTask.pending,(state)=>{
        state.loading =true,
        state.error =null
      })
      .addCase(createTask.fulfilled, (state, action)=>{
        state.loading=false,
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected,(state, action)=>{
        state.error =action.error.message,
          state.loading=false

      } )


      .addCase(updateTask.fulfilled, (state, action)=>{
        const updatedTask = action.payload;
        state.loading=false,
        state.tasks =state.tasks.map((task)=>
        task.id ===updatedTask.id?{...task, ...updatedTask}: task);
       
      })
      

       .addCase(assignedTaskToUser.fulfilled, (state, action)=>{
        const updatedTask = action.payload;
        state.loading=false,
        state.tasks =state.tasks.map((task)=>
        task.id ===updatedTask.id?{...task, ...updatedTask}: task);
       
      })


      
       .addCase(deleteTask.fulfilled, (state, action)=>{
        // const deletedTask = action.payload;
        state.loading=false,
        state.tasks =state.tasks.filter((task)=>task.id==action.payload)
       
      })
    }

  })
export default taskSlice.reducer;
  