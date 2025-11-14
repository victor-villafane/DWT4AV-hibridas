import React, { Activity, useState } from 'react'
import { createProduct } from '../services/productos.services'
import { useNavigate } from 'react-router'

const NuevoProducto = () => {
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()

    const validateForm = (payload) => {
        const error = {}
        if (!payload.marca) error.marca = "La marca es un campo requerido"
        if (!payload.modelo) error.modelo = "La modelo es un campo requerido"
        if (!payload.precio) error.precio = "La precio es un campo requerido"

        setErrores(error)
        return Object.keys(error).length == 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            marca: e.target.marca.value,
            modelo: e.target.modelo.value,
            precio: e.target.precio.value
        }

        if (!validateForm(payload)) return
        createProduct(payload)
            .then(async res => {
                if (!res.ok) throw await res.json()
                navigate("/listado")
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md' >
            <h1 className='text-2xl py-6 font-bold' >Nuevo producto</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4' >
                    <label className='block text-sm font-medium text-gray-700' > Marca: </label>
                    <input className='w-full mt-2 p-3 border border-gray-300 rounded-md' type="text" name="marca" />
                    <Activity mode={errores.marca ? 'visible' : 'hidden'} >
                        <p>{errores.marca}</p>
                    </Activity>
                </div>
                <div className='mb-4'  >
                    <label className='block text-sm font-medium text-gray-700' > Modelo: </label>
                    <input className='w-full mt-2 p-3 border border-gray-300 rounded-md' type="text" name="modelo" />
                    <Activity mode={errores.modelo ? 'visible' : 'hidden'} >
                        <p>{errores.modelo}</p>
                    </Activity>
                </div>
                <div className='mb-4'  >
                    <label className='block text-sm font-medium text-gray-700' > Precio: </label>
                    <input className='w-full mt-2 p-3 border border-gray-300 rounded-md' type="number" name="precio" />
                    <Activity mode={errores.precio ? 'visible' : 'hidden'} >
                        <p>{errores.precio}</p>
                    </Activity>
                </div>
                <button className='w-full py-3 mt-4 bg-blue-600 text-white rounded-md' type="submit" >Guardar</button>
            </form>
        </div>
    )
}

export default NuevoProducto