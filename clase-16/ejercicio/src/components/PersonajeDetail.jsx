import React from 'react'

const PersonajeDetail = ({personajeSeleccionado, ...res}) => {
  return (
    <div {...res} >
        <h2>Nombre: {personajeSeleccionado.name}</h2>
        <p>Genero: {personajeSeleccionado.gender}</p>
        <p>Trabajo: {personajeSeleccionado.occupation}</p>
        <p>Fecha de nacimiento: {personajeSeleccionado.birthdate}</p>
        <p>Edad: {personajeSeleccionado.age}</p>
    </div>
  )
}

export default PersonajeDetail