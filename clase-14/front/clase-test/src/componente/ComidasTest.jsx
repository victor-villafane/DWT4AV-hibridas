import React, { useState, useEffect } from 'react'
//rafce
const ComidasTest = () => {
    const [ comidas, setComidas ] = useState([])
    const [ recargar, setRecargar ] = useState(false)
    const [ posicion, setPosicion ] = useState({})
    // if( comidas.length == 0 ){
    //     setComidas( JSON.parse( localStorage.getItem('comidas') ) )
    // }

    useEffect( () => {
        //componentDidMount
        setComidas( JSON.parse( localStorage.getItem('comidas') ) )
        console.log("Me llamaron solo cuando se renderiza")
       
    }, [] )

    useEffect( () => {
        console.log("Me llamaron cuando el componente se renderiza por primera vez y cuando cambia recargar")
        const idInterval = setInterval( () => {
            setRecargar(!recargar)
            navigator.geolocation.getCurrentPosition( (position) => setPosicion(position.coords) )
        }, 10000 )
        return () => { //componentDidUnmount
            // console.log("Adios......")
            clearInterval( idInterval )
        }
    }, [recargar] ) //componentDidUpdate

    const [ nombreComida, setNombreComida ] = useState("")

    const handleNuevaComida = () => {
        setComidas([ ...comidas, { id: comidas.length + 1, nombre: nombreComida } ])
    }

    return (
        <div>
            <button onClick={ () => setRecargar( !recargar ) } >Recargar</button>
            <input type="text" onChange={ (e) => setNombreComida(e.target.value) } />
            <button onClick={ handleNuevaComida } >Nueva comida</button>
            {
                comidas.map( comida => <p key={ comida.id } >{comida.nombre}</p> )
            }
            <div>
                <iframe width="100%" 
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${posicion.longitude - 0.01},${posicion.latitude - 0.01},${posicion.longitude + 0.01},${posicion.latitude + 0.01}&layer=mapnik&marker=${posicion.latitude},${posicion.longitude}`}
                frameborder="0" style={{ border: 0 }}></iframe>
            </div>
        </div>
    )
}

export default ComidasTest