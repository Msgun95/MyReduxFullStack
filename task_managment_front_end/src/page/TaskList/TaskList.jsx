import React, { useEffect } from 'react'
import TaskCard from '../Task/TaskCad/TaskCard'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTasks} from "../../ReduxToolkit/TaskSlice"
import store from '../../ReduxToolkit/Store'

export const TaskList = () => {
  const dispatch = useDispatch();
  const {task}=useSelector(Store=>store)

  useEffect (()=>{
    dispatch(fetchTasks({}))
  }, []);

    console.log("task ", task);
  return (
    <div className='w-[67vw '>
      <div className='space-y-5'>


        {
          [1, 1, 1, 1].map((item) => <TaskCard />)
        }

      </div>
    </div>
  )
}
