import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import PrivateRoutes from './PrivateRoutes'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={<PrivateRoutes><Home /></PrivateRoutes>} />
        </Routes>
    )
}

export default MainRoutes