import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import axios from 'axios'
function Login() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, SetshowPassword] = useState(false)

    const fetchLogin = async () => {
        setLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        try {
            const response = await axios.post('http://localhost:3000/login', {
                password,
                email
            })

            alert('Bienvenido')
            setPassword('')
            localStorage.setItem('token', response.data.token)
        }
        catch (error) {
            alert(error.response?.data?.message || 'No se pudo iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h2>Login</h2>
            <input type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)} />
            <input type={showPassword ? 'text' : 'password'} placeholder="contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type='button' color={showPassword ? 'warning' : 'primary'} onClick={() => SetshowPassword(!showPassword)} >  {showPassword ? 'Ocultar' : 'Mostrar'} contraseña  </button>
            <Button variant="contained" onClick={fetchLogin} disabled={loading}>{loading ? <CircularProgress size={23} color="success" /> : 'Login'}</Button>
        </>
    )
}

export default Login