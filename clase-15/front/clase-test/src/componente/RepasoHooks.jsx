import React, { useEffect, useState } from 'react'

const RepasoHooks = () => {

    const [ nombre, setNombre ] = useState("")
    const [ recargar, setRecargar ] = useState(false)
    useEffect( () => {
        //Cuando se renderiza por primera vez
        setNombre( "Homero" )
        //console.log("error")

        const idIntervalo = setInterval( () => {
            setRecargar(!recargar);
            console.log("Soy una funcion")
        }, 1000 )
        
        return () => { //unmount
            //console.log("El componente desaparecio")
            clearInterval(idIntervalo);
        }
    }, [recargar] )//se vuelve a ejecutar cuando el state que le pasamos cambia de valor
    
    return (
        <div>
            {nombre}
        </div>
    )
}

export default RepasoHooks