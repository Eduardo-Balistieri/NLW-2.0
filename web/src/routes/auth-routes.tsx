import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Login from '../pages/Login'
import Signup from '../pages/Signup'
import SuccessSignup from '../pages/SuccessSignup'
import ForgotPassword from '../pages/ForgotPassword'


const AuthRoutes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/success-signup' component={SuccessSignup} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    )
}

export default AuthRoutes