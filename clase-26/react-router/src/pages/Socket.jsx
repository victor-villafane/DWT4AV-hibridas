import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io("http://localhost:2025/")

const Socket = () => {

    useEffect( () => {
        socket.on("recibido", (data) => console.log("Mensaje recibido!", data) )
        socket.on("notificados", () => console.log("Mensaje recibido para todos!") )
    }, [] )

    const handleClick = () => {
        socket.emit("hola", {
            id: 1,
            nombre: "Juan",
            apellido: "Perez"
        })
    }

    const handleTodos = () => {
        socket.emit("todos")
    }

    return (
        <div>
            <div>
                <button onClick={handleClick} >click</button>
            </div>
            <div>
                <button onClick={handleTodos} >Notificar a todos</button>
            </div>
        </div>
    )
}

export default Socket