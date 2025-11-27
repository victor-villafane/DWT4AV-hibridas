import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useProductos } from '../hooks/useProductos'

const Listado = () => {
    const { productos, error, loading } = useProductos()

    if (error) {
        return <div>Error al cargar el contenido</div>
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div className='p-6 bg-gray-50 min-h-screen' >
            <div className='max-w-7xl mx-auto' >
                <h1 className='text-2xl font-bold text-gray-900 mb-6' >Listado de productos</h1>
                <Link className='bg-blue-600 hover:bg-blue-700 m-2 text-white px-4 py-2 rounded-md text-sm font-medium' to="/nuevo-producto" >Nuevo producto</Link>
            </div>
            <table className='min-w-full divide-y divide-gray-200 my-4' >
                <thead className='bg-gray-100' >
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tacking-wider' >#</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tacking-wider' >Marca</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tacking-wider' >Modelo</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tacking-wider' >Precio</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 tacking-wider' >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(producto =>
                            <tr className='hover:bg-gray-350' key={producto._id}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm texat-gray-500' >{producto._id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm texat-gray-500' >{producto.marca}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm texat-gray-500' >{producto.modelo}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm texat-gray-500' >{producto.precio}</td>
                                <td className='px-6 py-4 whitespace-nowrap' >
                                    <Link className='bg-blue-600 hover:bg-blue-700 m-2 text-white px-4 py-2 rounded-md text-sm font-medium' to={"/detalle/" + producto._id} >Ver</Link>
                                    <Link className='bg-gray-600 hover:bg-gray-700 m-2 text-white px-4 py-2 rounded-md text-sm font-medium'  to={"/editar-producto/" + producto._id} >Editar</Link>
                                    <Link className='bg-red-600 hover:bg-red-700 m-2 text-white px-4 py-2 rounded-md text-sm font-medium' to={"/delete/" + producto._id} >Delete</Link>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
            <ul>

            </ul>
        </div>
    )
}

export default Listado