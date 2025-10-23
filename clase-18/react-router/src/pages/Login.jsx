import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    const handleLogin = () => {
        console.log(email, pass)
        //TODO deberiamos llamar a la api
        localStorage.setItem("session", JSON.stringify({email, pass}))
        //validar ingreso del usuario
        navigate("/listado")        //https://reactrouter.com/start/framework/navigating
    }

    return (
        <div>
            <input
                type='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='ingresar email' />
            <input
                type='pass'
                id='pass'
                onChange={(e) => setPass(e.target.value)}
                placeholder='ingresar pass' />
            <button onClick={handleLogin} >Ingresar</button>
        </div>
    )
}

export default Login