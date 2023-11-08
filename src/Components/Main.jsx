import React from 'react'
import {View} from 'react-native'
import {Route, Routes, NativeRouter, Link } from 'react-router-native'
import Admin from './administracion/Admin.jsx'
import Inicio from './Inicio.jsx'
import ConfirmarCrearAula from './administracion/ConfirmacionCrearAula.jsx'
import CrearAula from './administracion/CrearAula.jsx'




const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    <Route path='/crearaula' exact element={<CrearAula/>} />
                    <Route path='confirmacioncrearaula' exact element={<ConfirmarCrearAula/>}/>

                </Routes>  
            </View>
        </NativeRouter>

    )
}

export default Main