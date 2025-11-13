import React, { Activity, useState } from 'react'
import { useNavigate } from 'react-router'
import { authRegister } from '../services/auth.services'

const Register = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [passConfirm, setPassConfirm] = useState("")
    const [age, setAge] = useState("")
    const [err, setErr] = useState([])
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()

    const validateForm = () => {
        const error = {}
        if (!email) {
            error.email = "El email es requerido"
        }

        if (!pass) {
            error.password = "El password es requerido"
        } else {
            if (!(pass.length >= 8)) {
                error.password += " El password debe tener al menos 8 caracteres "
            }
            if (!/[0-9]/.test(pass)) {
                error.password += " El password debe tener al menos un numero "
            }
            if (!/[A-Z]/.test(pass)) {
                error.password += " El password debe tener al menos una mayuscula "
            }
            if (!/[a-z]/.test(pass)) {
                error.password += "El password debe tener al menos una minuscula "
            }
            if (!/[@!$%&=?¿]/.test(pass)) {
                error.password += "El password debe tener al menos un caracter especial "
            }
        }
        if (!passConfirm && passConfirm != pass) {
            error.password += "Confirmar la contraseña es requerido"
        }
        if (age < 0) {
            error.age = "La edad no puede ser negativa"
        }

        setErrores(error)

        return Object.keys(error).length > 0
    }

    const handleLogin = () => {
        console.log(email, pass)

        if (validateForm()) return

        const payload = { email, password: pass, passwordConfirm: passConfirm, age: age || undefined }
        // if( age ) payload.age = age

        authRegister(payload)
            .then(async (res) => {
                if (!res.ok) throw await res.json()
                return res.json()
            })
            .then(data => {
                console.log(data)
                navigate("/login")
            })
            .catch(error => setErr(error.message))
    }
    console.log(err)
    return (
        <div>
            <div>
                <input
                    type='email'
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='ingresar email' />
                <Activity mode={errores?.email ? 'visible' : 'hidden'} >
                    <p style={{ color: "red" }} >{errores.email}</p>
                </Activity>
            </div>

            <div>
                <input
                    id='pass'
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='ingresar pass' />
                <Activity mode={errores?.password ? 'visible' : 'hidden'} >
                    <p style={{ color: "red" }} >{errores.password}</p>
                </Activity>                    
            </div>
            <div>
                <input
                    id='passConfirm'
                    onChange={(e) => setPassConfirm(e.target.value)}
                    placeholder='confirmar pass' />
                <Activity mode={errores?.passConfirm ? 'visible' : 'hidden'} >
                    <p style={{ color: "red" }} >{errores.passConfirm}</p>
                </Activity>                         
            </div>
            <div>
                <input
                    type='number'
                    id='age'
                    onChange={(e) => setAge(e.target.value)}
                    placeholder='ingresar edad' />
                <Activity mode={errores?.age ? 'visible' : 'hidden'} >
                    <p style={{ color: "red" }} >{errores.age}</p>
                </Activity>                       
            </div>
            <button onClick={handleLogin} >Ingresar</button>
            <Activity mode={err.length > 0 ? 'visible' : 'hidden'} >
                {err?.map((error, i) => <p key={i} style={{ color: "red" }} >{error}</p>)}
            </Activity>
        </div>
    )
}

export default Register