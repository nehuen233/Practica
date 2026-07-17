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
  const [showPassword, SetshowPassword] = useState(false) // --> Estado para esconder contraseña

  const registerUser = async () => {
    if (!email || !password || !firstName || !lastName) {
      alert('Faltan datos')
      return
    }

    (true)

        // recordar poner el condicial de limite antes del AXIOS
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (password.length < 6) {
        alert("La contraseña debe ser de 6 caracteres")
        return
      } //condicion de caracteres en password

      const response = await axios.post('http://localhost:3000/users', {
        password,
        email,
        firstName,
        lastName
      })

      alert("Usuario registrado correctamente")
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('') //esto hace que los espacios se limpien solos

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
      <input type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input type={showPassword ? 'text' : 'password'} placeholder="contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
      <input type="text" placeholder="nombre" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
      <input type="text" placeholder="apellido" value={lastName} onChange={(event) => setLastName(event.target.value)} />
      <button type='button' color={showPassword ? 'warning' : 'primary'} onClick={() => SetshowPassword(!showPassword)} >  {showPassword ? 'Ocultar' : 'Mostrar'} contraseña  </button>
      <Button variant="contained" onClick={registerUser} disabled={loading}>{loading ? <CircularProgress size={23} color="primary" /> : 'Register'}</Button>
    </>
  )
}

export default Register
