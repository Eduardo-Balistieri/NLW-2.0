import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForm from '../pages/TeacherForm'


const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Route path='/' component={Landing} />
            <Route path='/study' component={TeacherList} />
            <Route path='/give-classes' component={TeacherForm} />
        </BrowserRouter>
    )
}

export default AppRoutes