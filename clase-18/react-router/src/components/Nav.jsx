import React from 'react'
import { Link } from 'react-router'

const Nav = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/listado">Listado</Link></li>
                    <li><Link to="/login">login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav