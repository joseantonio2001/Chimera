import React from 'react'
import {View} from 'react-native'
import {Route, Routes, NativeRouter, Link } from 'react-router-native'
import Alumno from './Alumno.jsx'
import Profesor from './Profesor.jsx'
import Admin from './Admin.jsx'
import Inicio from './Inicio.jsx'
import CrearAlumno from './CrearAlumno.jsx'
import ConfirmarCrearUsuario from './ConfirmacionCrearUsuario.jsx'
import CrearProfe from './CrearProfesor.jsx'




const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/alumno' exact element={<Alumno/>} />
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    <Route path='/crearalumno' exact element={<CrearAlumno/>} />
                    <Route path='/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='confirmacioncrearusuario' exact element={<ConfirmarCrearUsuario/>}/>
                </Routes>  
            </View>
        </NativeRouter>

    )
}

export default Main