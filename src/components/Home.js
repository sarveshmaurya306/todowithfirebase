import React, { useEffect, useState } from 'react'
import RenderTodos from './RenderTodos'
import LoadingCardSkeleton from './LoadingCardSkeleton';

import AddTodo from './AddTodoForm';

import { auth } from '../firebase'

import { useDispatch, useSelector} from 'react-redux'

import { UpdateUserData } from '../actions/index'

function Home(props) {
  const dispatch = useDispatch();
  
  // const [data, setData] = useState([]);
  const data = useSelector(state => state.getUserData)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length>0) {
      setLoading(false);
    }
  }, [data])
  

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      dispatch(UpdateUserData(user))
      setLoading(false)
    })
  }, [])

  return (
    <div style={{overflow:'hidden'}}>
      <div>
        <AddTodo >
          {props?.children}
        </AddTodo>
      </div>
      <br />
      <br />
      {
        loading?<LoadingCardSkeleton />:<RenderTodos />
      }
    </div>
  )
}

export default Home
