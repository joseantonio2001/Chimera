import {NativeRouter,Route, Routes} from 'react-router-native'
import Admin from './administracion/Admin.jsx'
import Alumno from './Alumno.jsx'
import Inicio from './Inicio.jsx'
import Profesor from './Profesor.jsx'
import {View} from 'react-native'

/* import CrearAlumno from './administracion/CrearAlumno';
import ConfirmarCrearUsuario from './administracion/ConfirmacionCrearUsuario';
import CrearProfe from './administracion/CrearProfesor';
import ConfirmarCrearTarea from './administracion/ConfirmacionCrearTarea';
import CrearTarea from './administracion/CrearTarea';
import CrearPaso from './administracion/CrearPaso'; */



const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/estudiante' exact element={<Alumno/>} />
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    {/* <Route path='/admin/crearalumno' exact element={<CrearAlumno/>} />
                    <Route path='/admin/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='confirmacioncrearusuario' exact element={<ConfirmarCrearUsuario/>}/>
                    <Route path='/admin/creartarea' exact element={<CrearTarea/>} />
                    <Route path='/admin/crearpaso' exact element={<CrearPaso/>} />
                    <Route path='confirmacioncreartarea' exact element={<ConfirmarCrearTarea/>}/> */}
                </Routes>  
            </View>
        </NativeRouter>

    )
}

export default Main
