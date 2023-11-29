import {NativeRouter,Route, Routes, } from 'react-router-native'
import Admin from './administracion/Admin.jsx'
import Alumno from './Alumno.jsx'
import CrearAlumno from './administracion/CrearAlumno.jsx';
import CrearAula from './administracion/CrearAula.jsx'
import CrearProfe from './administracion/CrearProfesor.jsx';
import EditarAlumno from './administracion/EditarAlumno.jsx';
import EditarClase from './administracion/EditarClase.jsx';
import EditarProfe from './administracion/EditarProfe.jsx';
import ClaseProfesor from './ClaseProfesor.jsx';
import Profesor from './Profesor.jsx';
import Inicio from './Inicio.jsx';
import {View} from 'react-native';
import ConfirmAccion from './administracion/Confirmaciones.jsx'
import EditarTareasAlumno from './administracion/EditarTareasAlumno.jsx';




const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/estudiante' exact element={<Alumno/>} />
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/claseprofesor' exact element={<ClaseProfesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    <Route path='/admin/crearalumno' exact element={<CrearAlumno/>} />
                    <Route path='/admin/editaralumno' exact element={<EditarAlumno/>} />
                    <Route path='/admin/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='/admin/editarprofe' exact element={<EditarProfe/>} />
                    <Route path='/admin/editarclase' exact element={<EditarClase/>}/>
                    <Route path='/admin/crearaula' exact element={<CrearAula/>} />
                    <Route path='/confirmaciones' exact element={<ConfirmAccion/>}/>
                    <Route path='/admin/editartareasalumno' exact element ={<EditarTareasAlumno/>}/>
                </Routes>
            </View>
        </NativeRouter>

    )
}

export default Main
