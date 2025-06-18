import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({childern}) => {

    const { user } = useSelector((state) => state.auth)

    const iSAuthenticated = user || localStorage.getItem('chat-app-user')

    return iSAuthenticated ? (
        childern
    ) : (
        <Navigate to="/login" />
    )

}

export default ProtectedRoute
