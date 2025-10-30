import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router'

const Listado = () => {
    const [productos, setProductos] = useState([])
    const [ err, setErr ] = useState(false)
    // const { productos } = useLoaderData()

    useEffect(() => {
        //fetch("https://hp-api.onrender.com/api/characters")
        const token = JSON.parse(localStorage.getItem("session"))
        console.log(token)
        fetch("http://localhost:2025/api/productos", {
            method: "GET",
            headers: {
                'Content-Type': "Application/json",
                "Authorization": `Bearar ${token}`
            }
        })
            .then(res => {
                if( !res.ok ) throw new Error("error")
                return res.json()
            })
            .then(products => {
                console.log(products)
                setProductos(products)
            })
            .catch( err => setErr(err.message) )
    }, [])

    if(err){
        return <div>Error al cargar el contenido</div>
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