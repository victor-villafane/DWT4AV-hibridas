import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router'
import { useProductos } from '../hooks/useProductos'

const Listado = () => {
    const { productos, error, loading } = useProductos()

    if(error){
        return <div>Error al cargar el contenido</div>
    }

    if( loading ){
        return <div>Cargando...</div>
    }

    return (
        <div>
            <h1>Listado de productos</h1>
            <ul>
                {
                    productos.map( producto => <li key={producto._id} > {producto.modelo} - <Link to={"/detalle/" + producto._id} >Ver</Link> </li> )
                }
            </ul>
        </div>
    )
}

export default Listado