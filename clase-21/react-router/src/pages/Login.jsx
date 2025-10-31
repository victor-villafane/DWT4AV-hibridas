import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '../contexts/SessionContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    
    const login = useLogin()

    const handleLogin = () => {
        console.log(email, pass)
        fetch( "http://localhost:2025/api/usuarios/login",{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password: pass
            })
        } )
        .then( (res) => {
            if( !res.ok ) throw new Error("Credenciales invalidas")
            return res.json()
        } )
        .then( data => {
            console.log(data)
            login( data )
            navigate("/listado") 
        } )
        .catch( err => setErr(err.message) )
    }
    console.log(err)
    return (
        <div>
            {
                err.length > 0 && <p style={{color: "red"}} >{ err.message }</p>
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
        </div>
    )
}

export default Login