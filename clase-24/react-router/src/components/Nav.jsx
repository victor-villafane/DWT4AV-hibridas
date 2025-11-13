import React, { Activity } from 'react'
import { Link } from 'react-router'
import { useSession, useUsuario } from '../contexts/SessionContext'

const Nav = () => {
    const usuario = useUsuario()
    return (
        <nav className='bg-white shadow-sm' >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
                <div className='flex justify-between h-16' >
                    <div className='flex items-center' >
                        <span className='text-xl font-bold text-gray-800' >{usuario?.email || "LOGO"}</span>
                    </div>
                    <div className='flex items-center space-x-4' >
                        <Link className='text-gray-600 hover:text-gray-900 py-2' to="/">Home</Link>
                        <Activity mode={usuario?.email ? "visible" : "hidden"} >
                            <Link className='text-gray-600 hover:text-gray-900 py-2' to="/listado">Listado</Link>
                            <Link className='text-gray-600 hover:text-gray-900 py-2' to="/logout">logout</Link>
                        </Activity>
                        <Activity mode={usuario?.email ? "hidden" : "visible"} >
                            <Link className='text-gray-600 hover:text-gray-900 py-2' to="/login">login</Link>
                            <Link className='text-gray-600 hover:text-gray-900 py-2' to="/register">registrar</Link>
                        </Activity>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav