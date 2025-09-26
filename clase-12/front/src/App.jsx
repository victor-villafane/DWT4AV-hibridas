//functional component
// export default function App(){
//   return <h1>Hola!</h1>
// }
//arrow function component
// const App = () => {
//   return <h1>Hola desde arrow</h1>
// }

// export default App;
//class component -> deprecated
// import React from 'react'
// class App extends React.Component {
//   render(){
//     return <h1>Hola desde la clase</h1>
//   }
// }
// export default App;

import React, { useState } from 'react'

const App = () => {
  /* JS */
  console.log("Hola!")
  const mensaje = "Hola!"
  const usuarios = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Perez"
    },
    {
      id: 2,
      nombre: "Pepe",
      apellido: "Perez"
    },
    {
      id: 3,
      nombre: "Homero",
      apellido: "Simpson"
    }
  ] 

  // const arrayJSX = usuarios.map( (usuario, indice) => <p key={indice} >{usuario.nombre}, { usuario.apellido }</p> )
  // let contador = 0  esto no muestra los cambios!!
  const [ contador, setContador ] = useState(0)
  const [ email, setEmail ] = useState("")
  const miFunctionn = () => {
    setContador( contador + 1 )
    console.log("miFunctionn", contador)
  }
  
  const handleEmail = (e) => {
    console.log("Me llamaron", e.target.value)
    setEmail( e.target.value )
  }

  /* */
  return (  //Esto es "como" ""HTML""
    <div className="text-info" >
      { usuarios.map( (usuario, indice) => 
            <p key={indice} >{usuario.nombre}, { usuario.apellido }</p> 
          ) }
      Contador: { contador } <br />
      Email: { email } <br />
      <button onClick={ () => miFunctionn("Hola") } >Click</button>
      <input type="text" name="email" id="email" onChange={handleEmail} />
    </div>
  )
}

export default App