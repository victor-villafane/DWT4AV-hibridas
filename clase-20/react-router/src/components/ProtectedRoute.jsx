import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = ({element}) => {
    const session = JSON.parse( localStorage.getItem("session") )
    if( session ) return element

    return <Navigate to="/login" />
}

export default ProtectedRoute