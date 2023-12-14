import {NativeRouter,Route, Routes} from 'react-router-native'
import Admin from './administracion/Admin.jsx'
import Alumno from './Alumno.jsx'
import Confirmaciones from './administracion/Confirmaciones';
import CrearAlumno from './administracion/CrearAlumno';
import CrearAula from './administracion/CrearAula.jsx'
import CrearPaso from './administracion/CrearPaso.jsx';
import CrearProfe from './administracion/CrearProfesor';
import EditarAlumno from './administracion/EditarAlumno.jsx'
import EditarClase from './administracion/EditarClase.jsx'
import EditarPaso from './administracion/EditarPaso.jsx'
import EditarProfe from './administracion/EditarProfe.jsx'
import EditarTarea from './administracion/EditarTarea.jsx'
import Inicio from './Inicio.jsx'
import Profesor from './Profesor.jsx'
import {View} from 'react-native'

const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/estudiante' exact element={<Alumno/>} />
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    <Route path='/admin/crearalumno' exact element={<CrearAlumno/>} />
                    <Route path='/admin/editaralumno' exact element={<EditarAlumno/>} />
                    <Route path='/admin/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='/admin/editarprofe' exact element={<EditarProfe/>} />
                    <Route path='/admin/crearclase' exact element={<CrearAula/>} />
                    <Route path='/admin/editarclase' exact element={<EditarClase/>}/> 
                    <Route path='/admin/editartarea' exact element={<EditarTarea/>}/>
                    <Route path='/confirmaciones' exact element={<Confirmaciones/>}/>
                    <Route path='/admin/tareas/crearpaso' exact element={<CrearPaso/>}/>
                    <Route path='/admin/tareas/editarpaso' exact element={<EditarPaso/>}/>
                </Routes>
            </View>
        </NativeRouter>

    )
}

export default Main
