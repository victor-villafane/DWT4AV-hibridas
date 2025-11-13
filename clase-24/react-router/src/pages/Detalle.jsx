import React from 'react'
import { Link, useParams } from 'react-router'
import { useProducto } from '../hooks/useProductos'

const Detalle = () => {

    const params = useParams()
    const id = params.id
    const { producto, error, loading } = useProducto(id)

    if (error) return <div>Producto no encontrado</div>

    return !loading ? (
        <div className='max-w-3xl mx-auto p-6' >
            <h1 className='text-3xl font-bold mb-2' >{producto.modelo}</h1>
            <p className='text-xl text-gray-600 mb-6' >Marca: {producto.marca}</p>
            <div className='space-y-3 mb-6' >
                <p className='font-semibold'>Precio: {producto.precio}</p>
            </div>
            <Link className='bg-blue-600 hover:bg-blue-700 m-2 text-white px-4 py-2 rounded-md text-sm font-medium' to="/listado">Volver</Link>
        </div>
    ) : <div>Cargando</div>
}

export default Detalle