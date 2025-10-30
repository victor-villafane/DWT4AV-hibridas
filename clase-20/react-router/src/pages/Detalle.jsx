import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router'

export async function loaderDetalle({params}){
    try {
        const res = await fetch("http://localhost:2025/api/productos/" + params.id)
        if( !res.ok ) throw new Error("Producto no encontrado")
        
        const producto = await res.json()
        return {producto}
    } catch (error) {
        throw new Error(error.message)
    }
}

const Detalle = () => {
    // const [producto, setProducto] = useState(null)
    // const [ loading, setLoading ] = useState(true)
    // const { id } = useParams()

    // useEffect( () => {
    //     //fetch("https://hp-api.onrender.com/api/character/" + id)
    //     fetch("http://localhost:2025/api/productos/" + id)
    //         .then( res => res.json() )
    //         .then( product => setProducto(product) )
    //         .catch( err => console.log(err.message) )
    //         .finally( () => setLoading(false) )
    // }, [] )

    // if(loading) return <div>Cargando...</div>
    // console.log(producto)
    const { producto } = useLoaderData()
    return (
        <div>
            <h1>{producto.modelo}</h1>
            <p>Precio: {producto.precio}</p>
            <Link to="/listado">Volver</Link>
        </div>
    )
}

export default Detalle