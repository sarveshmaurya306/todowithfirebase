import { Avatar, IconButton, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import { auth, googleProvider } from './firebase'

function App() {
  
  
  const handleClick = () => {
    auth.signInWithPopup(googleProvider).then(r => {
      return r.user.uid;
    })
  }

  const signOut = () => {
    auth.signOut();
  }


  const [url, setUrl] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (auth.currentUser)
        setUrl(auth.currentUser?.photoURL)
      else if (!user) {
        setUrl('')
      }
    })
  }, [])
  
  return (
    <div>
      <Home>
      {
        !url ?
          <Tooltip title="Login">
            <IconButton onClick={() => handleClick()}>
              <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" alt="google login" />
            </IconButton>
          </Tooltip>
          : <Tooltip title={`Log out from ${auth.currentUser.displayName}`}>
             <IconButton onClick={() => signOut()}>
            <Avatar src={url} />
          </IconButton>
          </Tooltip>
      }
      </Home>
    </div>
  )
}

export default App
