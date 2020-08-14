import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForm from '../pages/TeacherForm'
import UserSettings from '../pages/UserSettings'
import SuccessRegister from '../pages/SuccessRegister'



const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/give-classes' component={TeacherForm} />
                <Route path='/success-register' component={SuccessRegister} />
                <Route path='/study' component={TeacherList} />
                <Route path='/user-settings' component={UserSettings} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRoutes