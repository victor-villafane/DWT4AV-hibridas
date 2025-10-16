import React from 'react'

const PersonajeCard = ({personaje, ...res}) => {
  return (
    <ul {...res} >
        <li>Nombre: {personaje.name}</li>
        <li>Genero: {personaje.gender}</li>
        <li>Trabajo: {personaje.occupation}</li>
        <li>Fecha de nacimiento: {personaje.birthdate}</li>
        <li>Edad: {personaje.age}</li>
    </ul>
  )
}

export default PersonajeCard