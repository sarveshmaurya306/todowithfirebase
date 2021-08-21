import React, { useEffect, useState } from 'react'
import RenderTodos from './RenderTodos'
import LoadingCardSkeleton from './LoadingCardSkeleton';

import AddTodo from './AddTodoForm';

import { auth } from '../firebase'

import { useDispatch, useSelector} from 'react-redux'

import { UpdateUserData } from '../actions/index'

import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#26a27b"
    },
   
  }
})


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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default Home
