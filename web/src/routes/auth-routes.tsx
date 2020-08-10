import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Signup from '../pages/Signup'
import SuccessSignup from '../pages/SuccessSignup'


const AuthRoutes = () => {

    return (
        <BrowserRouter>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/success-signup' component={SuccessSignup} />
        </BrowserRouter>
    )
}

export default AuthRoutes