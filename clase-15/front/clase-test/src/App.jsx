//rfce -> functional component
import React, { useState } from 'react'
import SpanText from './componente/SpanText'
export default function App() {
  //todo el js
  const nombre = "Homero"
  const arrayPersonajes = [
    { 
      nombre: "Homero",
      apellido: "Simpson",
      edad: 38
    },
    { 
      nombre: "Marge",
      apellido: "Simpson",
      edad: 38
    },
    { 
      nombre: "Bart",
      apellido: "Simpson",
      edad: 38
    },    
    { 
      nombre: "Lisa",
      apellido: "Simpson",
      edad: 38
    },
    { 
      nombre: "Maggie",
      apellido: "Simpson",
      edad: 38
    }                
  ]
  // let inputValue = ""
  const [ inputValue, setInputValue ] = useState("")
  const [ valores, setValores ] = useState([])
  // const [ click, setClick ] = useState(false)
  const handleChange = (e) => {
    console.log(e.target.value) // -> saco el value del input
    setInputValue(e.target.value) // lo guardo en la variable
    console.log(inputValue)     //lo muestro por consola
  }
  // const handleClick = (nombre) => {
  //   console.log(nombre)
  //   setClick( !click )
  // }

  // const personajesJSX = arrayPersonajes.map( personaje => <><span>{personaje.nombre} - {personaje.apellido}</span><br></br></> )

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.nombre.value)
    const auxValores = [ ...valores ]
    auxValores.push(e.target.nombre.value)
    setValores(auxValores)
    e.target.nombre.value = ""
    // console.log( valores )
    //setValores() -> deberiamos usar setValores
  }

  return ( //solo retornamos ""html""
    <div className='' >
      { inputValue }
      <input type="text" onChange={handleChange} />
      { arrayPersonajes.map( (personaje, index) => <SpanText key={ index } /> ) }
      {
        valores.map( (valor, index) => <p key={index} >{valor}</p> )
      }
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" />
        <button type='submit' >guardar</button>
      </form>
    </div>
  )
}

// export default App
//rafce
// import React from 'react'

// const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// export default App

//rcc -> deprecated class component
// import React, { Component } from 'react'

// export default class App extends Component {
//   render() {
//     return (
//       <div>App</div>
//     )
//   }
// }
