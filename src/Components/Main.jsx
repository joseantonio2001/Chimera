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
import EditarAlumno from './administracion/EditarAlumno.jsx'
import EditarProfe from './administracion/EditarProfe.jsx'
import EditarClase from './administracion/EditarClase.jsx'




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
                    <Route path='/admin/editaralumno' exact element={<EditarAlumno/>} />
                    <Route path='/admin/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='/admin/editarprofe' exact element={<EditarProfe/>} />
                    <Route path='/admin/editarclase' exact element={<EditarClase/>}/>
                    <Route path='confirmacioncrearusuario' exact element={<ConfirmarCrearUsuario/>}/>
                    
                </Routes>  
            </View>
        </NativeRouter>

    )
}

export default Main