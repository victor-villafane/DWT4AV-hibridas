import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

const Detalle = () => {
    const [personaje, setPesonaje] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()

    useEffect( () => {
        //fetch("https://hp-api.onrender.com/api/character/" + id)
        fetch("https://pokeapi.co/api/v2/pokemon/"+id)
            .then( res => res.json() )
            .then( character => setPesonaje(character) )
            .catch( err => console.log(err.message) )
            .finally( () => setLoading(false) )
    }, [] )

    if(loading) return <div>Cargando...</div>

    return (
        <div>
            <h1>{personaje.name}</h1>
            <img src={personaje.sprites.front_default} alt="" width="200px" />
            <Link to="/listado">Volver</Link>
        </div>
    )
}

export default Detalle