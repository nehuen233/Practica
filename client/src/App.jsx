import Button from '@mui/material/Button'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import UserList from './components/UserList'

function App() {
  const logout = () =>{
    localStorage.setItem('token', '')
  }
  return (
    <>
      <Login />
      <Register/>
      <UserList/>
      <Button variant='contained' color='error' onClick={logout}>LOGOUT</Button>
    </>
  )
}

export default App
