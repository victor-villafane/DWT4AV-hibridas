import React, { Activity } from 'react'
import { Link } from 'react-router'
import { useSession, useUsuario } from '../contexts/SessionContext'

const Nav = () => {
    const usuario = useUsuario()
    console.log(usuario?.email)
    return (
        <header>
            <h1>{usuario?.email}</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <Activity mode={usuario?.email ? "visible" : "hidden"} > {/* https://react.dev/reference/react/Activity */}
                        <li><Link to="/listado">Listado</Link></li>
                        <li><Link to="/logout">logout</Link></li>
                    </Activity>
                    <Activity mode={usuario?.email ? "hidden" : "visible"} >
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/register">registrar</Link></li>
                    </Activity>
                </ul>
            </nav>
        </header>
    )
}

export default Nav