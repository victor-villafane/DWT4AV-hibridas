import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useLogin } from '../contexts/SessionContext'
import { authLogin } from '../services/auth.services'

const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const login = useLogin()

    const handleLogin = () => {
        console.log(email, pass)
        authLogin({ email, password: pass })
            .then((res) => {
                if (!res.ok) throw new Error("Credenciales invalidas")
                return res.json()
            })
            .then(data => {
                console.log(data)
                login(data)
                navigate("/listado")
            })
            .catch(err => setErr(err.message))
    }
    console.log(err)
    return (
        <div>
            {
                err.length > 0 && <p style={{ color: "red" }} >{err.message}</p>
            }
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
            <Link style={{display: "block"}} to="/recuperar-cuenta" >Olvidaste tu contraseña?</Link>
        </div>
    )
}

export default Login