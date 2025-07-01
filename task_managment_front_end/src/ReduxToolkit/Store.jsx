import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import authReducer from './AuthSlice'
import submissionSlice from "./SubmissionSlice"
import taskSlice from "./TaskSlice"

const rootReducer = combineReducers({
  auth:authReducer,
  task:taskSlice,
  submission: submissionSlice



})
export const store = configureStore({
  reducer:rootReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat()
})

export default store;