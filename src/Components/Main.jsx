import React from 'react'
import {View} from 'react-native'
import {Route, Routes, NativeRouter, Link } from 'react-router-native'
import Alumno from './Alumno.jsx'
import Profesor from './Profesor.jsx'
import Admin from './administracion/Admin';
import Inicio from './Inicio.jsx'
import CrearAlumno from './administracion/CrearAlumno';
import ConfirmarCrearUsuario from './administracion/ConfirmacionCrearUsuario';
import CrearProfe from './administracion/CrearProfesor';
import ConfirmarCrearAula from './administracion/ConfirmacionCrearAula.jsx'
import CrearAula from './administracion/CrearAula.jsx'





const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/alumno' exact element={<Alumno/>} />
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    <Route path='/admin/crearalumno' exact element={<CrearAlumno/>} />
                    <Route path='/admin/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='confirmacioncrearusuario' exact element={<ConfirmarCrearUsuario/>}/>
                    <Route path='/admin/crearaula' exact element={<CrearAula/>} />
                    <Route path='confirmacioncrearaula' exact element={<ConfirmarCrearAula/>}/>
                </Routes>  
            </View>
        </NativeRouter>

    )
}

export default Main