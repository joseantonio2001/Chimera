import React from 'react'
import {View, Image, StyleSheet, Button} from 'react-native'
import StyledText from './StyledText.jsx'
import {Route, Routes, NativeRouter, Link } from 'react-router-native'
import Alumno from './Alumno.jsx'
import Profesor from './Profesor.jsx'
import Admin from './Admin.jsx'
import Inicio from './Inicio.jsx'




const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/alumno' exact element={<Alumno/>} />
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                </Routes>  
            </View>
        </NativeRouter>

    )
}

export default Main