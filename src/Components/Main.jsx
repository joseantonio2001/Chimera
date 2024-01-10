import {NativeRouter,Route, Routes, } from 'react-router-native'
import Inicio from './Inicio.jsx';
import Alumno from './Alumno.jsx'
import Profesor from './Profesor.jsx';
import Admin from './administracion/Admin.jsx'
import CrearAlumno from './administracion/CrearAlumno.jsx';
import EditarAlumno from './administracion/EditarAlumno.jsx';
import CrearProfe from './administracion/CrearProfesor.jsx';
import EditarProfe from './administracion/EditarProfe.jsx';
import CrearAula from './administracion/CrearAula.jsx';
import EditarClase from './administracion/EditarClase.jsx';
import ClaseProfesor from './ClaseProfesor.jsx';
import CrearPaso from './administracion/CrearPaso';
import MostrarPasos from "./tareasAlumno/MostrarPasos";
import CrearTarea from './administracion/CrearTarea';
import {View} from 'react-native';
import ConfirmAccion from './administracion/Confirmaciones.jsx';
import TareasHoy from './TareasHoy.jsx';
import EditarTareasAlumno from './administracion/EditarTareasAlumno.jsx';
import TareaFinalizada from "./tareasAlumno/TareaFinalizada";
import EditarTarea from './administracion/EditarTarea.jsx';
// import EditarPaso from "./administracion/EditarPaso.jsx";

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
                <Route path='/admin/crearaula' exact element={<CrearAula/>} />
                <Route path='/admin/editarclase' exact element={<EditarClase/>}/>
                <Route path='/claseprofesor' exact element={<ClaseProfesor/>} />
                <Route path='/admin/creartarea' exact element={<CrearTarea/>} />
                <Route path='/admin/tareas/crearpaso' exact element={<CrearPaso/>}/>
                { /*<Route path='/admin/tareas/editarpaso' exact element={<EditarPaso/>}/> */ }
                { /* <Route path='/admin/editartarea' exact element={<EditarTarea/>}/> */ }
                <Route path='/mostrarpasos/:id' element={<MostrarPasos/>} />
                <Route path='/confirmaciones' exact element={<ConfirmAccion/>}/>                
                
                <Route path='/tareasHoy' exact element={<TareasHoy/>}/>                    
                <Route path='/admin/editartareasalumno' exact element ={<EditarTareasAlumno/>}/>
                <Route path='confirmacioncrearaula' exact element={<ConfirmAccion/>}/>
                <Route path='/tareafinalizada' exact element={<TareaFinalizada/>}/>
                </Routes>
            </View>
        </NativeRouter>

    )
}

export default Main
export const modoVisualizacion = '010';
