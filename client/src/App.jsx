import { useState } from 'react'
import Button from '@mui/material/Button'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import UserList from './components/UserList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  )

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <UserList />

          <Button variant="contained" color="error" onClick={logout}>
            LOGOUT
          </Button>
        </>
      ) : (
        <>
          <Login onLogin={() => setIsLoggedIn(true)} />
          <Register />
        </>
      )}
    </>
  )
}

export default App