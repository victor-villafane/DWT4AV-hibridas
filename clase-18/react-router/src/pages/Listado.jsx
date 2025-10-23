import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router'

const Listado = () => {
    // const [productos, setProductos] = useState([])
    const { productos } = useLoaderData()

    // useEffect(() => {
    //     //fetch("https://hp-api.onrender.com/api/characters")
    //     fetch("http://localhost:2025/api/productos")
    //         .then(res => res.json())
    //         .then(products => {
    //             console.log(products)
    //             setProductos(products)
    //         })
    // }, [])

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