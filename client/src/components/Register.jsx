import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import axios from 'axios'
function Register() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [loading, setLoading] = useState(false)

   const registerUser = async () => {
  if (!email || !password || !firstName || !lastName) {
    alert('Faltan datos')
    return
  }

  setLoading(true)

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await axios.post('http://localhost:3000/users', {
      password,
      email,
      firstName,
      lastName
    })

    console.log(response.data)
    alert('Usuario registrado')
  } catch (error) {
    alert(error.response?.data?.message || 'No se pudo registrar')
  } finally {
    setLoading(false)
  }
}
    return (
        <>
            <h2>Register</h2>
            <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} />
            <input type="text" placeholder="contraseña" onChange={(event) => setPassword(event.target.value)} />
            <input type="text" placeholder="nombre" onChange={(event) => setFirstName(event.target.value)} />
            <input type="text" placeholder="apellido" onChange={(event) => setLastName(event.target.value)} />
            <Button variant="contained" onClick={registerUser} disabled={loading}>{loading ? <CircularProgress size={23} color="inherit" /> : 'Register'}</Button>
        </>
    )
}

export default Register