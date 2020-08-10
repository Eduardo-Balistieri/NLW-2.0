import React from 'react'

import './assets/styles/global.css'
import Routes from './routes'
import { AuthProvider } from './contexts/auth'


const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App