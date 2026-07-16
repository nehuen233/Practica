import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import axios from 'axios'
 
function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)

        try {
            // Solo para probar el spinner; eliminar luego.
            // await new Promise((resolve) => setTimeout(resolve, 2000))

            const token = localStorage.getItem('token')

            const response = await axios.get('http://localhost:3000/users', {
                headers: {
                    authorization: token
                }
            })

            setUsers(response.data)
        } catch (error) {
            alert('Debes estar logueado')
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users.filter((user) => {
        const text =
            `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase()

        return text.includes(search.toLowerCase())
    })

    return (
        <>
            <h2>Usuarios</h2>

            <Button
                variant="contained"
                color="info"
                onClick={fetchUsers}
                disabled={loading}
            >
                Actualizar lista
            </Button>

            <br />
            <br />

            <TextField
                label="Buscar usuario"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            {loading ? (
                <CircularProgress size={30} />
            ) : filteredUsers.length !== 0 ? (
                filteredUsers.map((user) => (
                    <Card key={user.id} sx={{ margin: 2 }}>
                        <CardContent>
                            <Avatar>
                                {user.firstName[0]}{user.lastName[0]}
                            </Avatar>

                            <h3>{user.firstName} {user.lastName}</h3>
                            <p>{user.email}</p>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <h3>No se encontraron usuarios</h3>
            )}
        </>
    )
}

export default UserList
