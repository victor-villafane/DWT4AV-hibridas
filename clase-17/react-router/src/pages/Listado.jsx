import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Listado = () => {
    const [personajes, setPersonajes] = useState([])
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)

    useEffect(() => {
        //fetch("https://hp-api.onrender.com/api/characters")
        fetch(url)
            .then(res => res.json())
            .then(characters => {
                setPersonajes(characters.results)
                setNext(characters.next)
                setPrev(characters.previous)
            })
    }, [url])

    return (
        <div>
            <h1>Listado de personajes</h1>
            <ul>
                {
                    personajes.map( personaje => <li key={personaje.name} > {personaje.name} - <Link to={"/detalle/" + personaje.name} >Ver</Link> </li> )
                }
            </ul>
            {prev !== null && <button onClick={ () => setUrl(prev) } >Prev</button>}
            {next !== null && <button onClick={ () => setUrl(next) } >Next</button>}
        </div>
    )
}

export default Listado