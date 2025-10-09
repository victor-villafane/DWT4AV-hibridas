import React, { useState, useEffect } from 'react'
import ListadoPersonajes from './ListadoPersonajes'
//rafce
const PersonajesTest = () => {
    const [ personajes, setPersonajes ] = useState([
        {id: 1, nombre: "Homero", apellido: "Simpson"},
        {id: 2, nombre: "Marge", apellido: "Simpson"},
        {id: 3, nombre: "Bart", apellido: "Simpson"},
    ])

    const [ nombrePersonaje, setNombrePersonaje ] = useState("")

    const handleNuevoPersonaje = () => {
        setPersonajes([ ...personajes, { id: personajes.length + 1, nombre: nombrePersonaje } ])
    }

    return (
        <div>
            <button onClick={ handleNuevoPersonaje } >Nuevo personaje</button>
            <input type="text" onChange={ (e) => setNombrePersonaje(e.target.value) } />
            <ListadoPersonajes 
                listado={personajes} 
                titulo={"Hola soy un titulo"}
                className="text-center bg-primary text-primary"
                style={{ color: 'red' }}
            />
            {/* {
                personajes.map( personaje => <p key={ personaje.id } >{personaje.nombre}</p> )
            } */}
        </div>
    )
}

export default PersonajesTest