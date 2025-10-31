import React from 'react'
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
                    {usuario?.email && <li><Link to="/listado">Listado</Link></li>}
                    {usuario?.email && <li><Link to="/logout">logout</Link></li>}
                    {!usuario?.email && <li><Link to="/login">login</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Nav