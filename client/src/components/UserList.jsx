import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'; //ejercicio 5 -->  Indicador de carga
import { useEffect } from 'react'; 
import axios from 'axios'
import { useState } from 'react';
function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = async () => {
        setLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:3000/users', {
                headers: {
                    authorization: token
                }
            })
            setUsers(response.data)

        }
        catch (error) {
            alert("Debes estar logueado")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h2>Usuarios</h2>
            
            <button variant="contained" onClick={fetchUsers} disabled={loading} color='info'></button>  
            <h4>actualizar lista</h4>

            {loading ? (
                <CircularProgress size={30} />
            ) : users.length !== 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.firstName} - {user.lastName}
                        </li>
                    ))}
                </ul>
            ) : (
                <h2></h2>
            )}
        </>
    )
}

export default UserList