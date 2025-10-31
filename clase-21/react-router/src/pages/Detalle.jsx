import React from 'react'
import { Link, useParams } from 'react-router'
import { useProducto } from '../hooks/useProductos'

const Detalle = () => {

    const params = useParams()
    const id = params.id
    const { producto, error, loading } = useProducto(id)

    if( error ) return <div>Producto no encontrado</div>

    return !loading ? (
        <div>
            <h1>{producto.modelo}</h1>
            <p>Precio: {producto.precio}</p>
            <Link to="/listado">Volver</Link>
        </div>
    ) : <div>Cargando</div>
}

export default Detalle