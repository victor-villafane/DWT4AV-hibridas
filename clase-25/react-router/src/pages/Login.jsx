import React, { Activity, useContext, useState } from 'react'
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
        <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4' >
            <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full' >
                <div className='flex flex-col items-center mb-8' >
                    <h2 className='text-2xl fond-bold text-slate-800' >Iniciar Sesion</h2>
                    <p className='text-slate-600 mt-2'>Ingresar tus credenciales</p>
                </div>
                <Activity mode={err.length > 0 ? 'visible' : 'hidden'}>
                    <div className='bg-red-60 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3' >
                        <p className='text-red-700 text-sm'>{err}</p>
                    </div>
                </Activity>
                <div className='space-y-4' >
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Email:</label>
                        <div className='relative' >
                            <input
                                type='email'
                                className='w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='ingresar email' />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Contraseña:</label>
                        <div className='relative' >
                            <input
                                type='pass'
                                id='pass'
                                className='w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg'
                                onChange={(e) => setPass(e.target.value)}
                                placeholder='ingresar pass' />
                        </div>
                    </div>
                    <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration 200 shadow-lg' onClick={handleLogin} >Ingresar</button>
                    <Link className='block text-center text-blue-500 hover:text-blue-700 text-sm font-medium mt-4' to="/recuperar-cuenta" >Olvidaste tu contraseña?</Link>
                </div>

            </div>

        </div>
    )
}

export default Login