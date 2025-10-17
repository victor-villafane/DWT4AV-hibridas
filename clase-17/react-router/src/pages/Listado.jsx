import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Listado = () => {
    const [personajes, setPersonajes] = useState([])
    useEffect(() => {
        fetch("https://hp-api.onrender.com/api/characters")
            .then(res => res.json())
            .then(characters => setPersonajes(characters))
    }, [])

    return (
        <div>
            <h1>Listado de personajes</h1>
            <ul>
                {
                    personajes.map( personaje => <li key={personaje.id} > {personaje.name} - <Link to={"/detalle/" + personaje.id} >Ver</Link> </li> )
                }
            </ul>
        </div>
    )
}

export default Listado