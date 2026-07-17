import { useState } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'
import '../App.css'

// Crear un componente que busque personajes
function Character() {
    const [id, setId] = useState('')
    const [character, setCharacter] = useState(null)
    const [error, setError] = useState('')

   const fetchCharacter = async () =>{
    if (!id.trim()) {
        setError('Falta ID')
        setCharacter(null)
    }
    try{
        setError('')

        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)

        setCharacter(data)
    } catch (error) {
        setError('Personaje no encontrado')
        setCharacter(null)
    }
   }

   return (
    <>
    <div style={{maxWidth: '1200px'}}>
        <header style={{textAlign: 'center'}}>
            <h1>Buscador de personajes</h1>
        <input type="number" placeholder='ID del personaje' value={id} onChange={(event) => setId(event.target.value)} />
        <Button variant='contained' onClick={fetchCharacter}>Buscar</Button>

        {error && <p>{error}</p>}


        {character && (
            <article>
                <h2>{character.name}</h2>
                <img src={character.image} alt={character.name} />
                <p>Especie: {character.species}</p>
                <p>Estado: {character.status}</p>
                <p>Genero: {character.genere}</p>
            </article>
        )}
        </header>
    </div>
    </>
   )
}

export default Character