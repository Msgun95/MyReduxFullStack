import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthHeader } from "../api/api";
import { Build } from "@mui/icons-material";

export const submitTask = createAsyncThunk("submissions/submitTask",
  async({taskId, githubLink})=>{
    setAuthHeader(localStorage.getItem("jwt", api))

    try{
      const {data} = await api.post(`/api/submissions?task_id=${taskId}&github_link=${githubLink}`,
        {}

      );
      console.log("Submited task ", data)
      return data;

    }
    catch(error){
      throw Error (error.response.data.error);

    }
  }
)



export const fetchAllSubmission = createAsyncThunk("submissions/fetchAllSubmission",
  async()=>{
    setAuthHeader(localStorage.getItem("jwt", api))

    try{
      const {data} = await api.get(`/api/submissions`,
        {}

      );
      console.log("Submited task ", data)
      return data;

    }
    catch(error){
      throw Error (error.response.data.error);

    }
  }
)


export const fetchSubmissionByTaskId = createAsyncThunk("submissions/fetchSubmissionByTaskId",
  async(taskId)=>{
    setAuthHeader(localStorage.getItem("jwt", api))

    try{
      const {data} = await api.get(`/api/submissions/task/${taskId}`,
        {}

      );
      console.log("fetch submissions task ", data)
      return data;

    }
    catch(error){
      throw Error (error.response.data.error);

    }
  }
);



export const acceptDeclineSubmission = createAsyncThunk("submissions/acceptDeclineSubmission",
  async({id, status})=>{
    setAuthHeader(localStorage.getItem("jwt", api))

    try{
      const {data} = await api.put(`/api/submissions/${id}?status=${status}`,
        {}

      );
      console.log("accept task ", data)
      return data;

    }
    catch(error){
      throw Error (error.response.data.error);

    }
  }
);


const submissionSlice = createSlice({
  name:"submission",
  initialState:{
    submissions:[],
    status:'',
    error:null,

  },
  reducers:{},
  extraReducers: (Build)=>{
    Build
    .addCase(submitTask.pending, (state)=>{
       state.status='loading'; 
    })
    .addCase(submitTask.fulfilled, (state, action)=>{
      state.status='succeeded';
      state.submissions.push(action.payload);
    })
    .addCase(submitTask.rejected,(state, action)=>{
      state.status='failed',
       state.error =action.error.message;
    })



   .addCase(fetchAllSubmission.pending, (state)=>{
       state.status='loading'; 
    })
    .addCase(fetchAllSubmission.fulfilled, (state, action)=>{
      state.status='succeeded';
      state.submissions=action.payload;
    })
    .addCase(fetchAllSubmission.rejected,(state, action)=>{
      state.status='failed',
        state.error =action.error.message;
    })




     .addCase(fetchSubmissionByTaskId.fulfilled, (state, action)=>{
      state.status='succeeded';
      state.submissions=action.payload;
    })



    
     .addCase(acceptDeclineSubmission.fulfilled, (state, action)=>{
      state.status='succeeded';
      state.submissions= state.submissions.map(
        (item)=>item.id!==action.payload.id ? item : action.payload);
    })
  

  }
})

export default submissionSlice.reducer;