import {NativeRouter,Route, Routes, } from 'react-router-native'
import Admin from './administracion/Admin.jsx'
import Alumno from './Alumno.jsx'
import CrearAlumno from './administracion/CrearAlumno.jsx';
import CrearAula from './administracion/CrearAula.jsx';
import CrearProfe from './administracion/CrearProfesor.jsx';
import EditarAlumno from './administracion/EditarAlumno.jsx';
import EditarClase from './administracion/EditarClase.jsx';
import EditarProfe from './administracion/EditarProfe.jsx';
import Profesor from './Profesor.jsx';
import Inicio from './Inicio.jsx';
import ClaseProfesor from './ClaseProfesor.jsx';
import TareasHoy from './TareasHoy.jsx';
import {View} from 'react-native';
import ConfirmAccion from './administracion/Confirmaciones.jsx';
import EditarTareasAlumno from './administracion/EditarTareasAlumno.jsx';
import TareaFinalizada from "./tareasAlumno/TareaFinalizada";
import MostrarPasos from "./tareasAlumno/MostrarPasos";
import Confirmaciones from './administracion/Confirmaciones';
import CrearPaso from './administracion/CrearPaso';
import CrearTarea from './administracion/CrearTarea';
import StatsAlumno from './StatsAlumno.jsx';

const Main = ()=>{
    return(
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' exact element={<Inicio/>} />
                    <Route path='/estudiante' exact element={<Alumno/>} />
                    <Route path='/tareasHoy' exact element={<TareasHoy/>}/>
                    <Route path='/profesor' exact element={<Profesor/>} />
                    <Route path='/claseprofesor' exact element={<ClaseProfesor/>} />
                    <Route path='/admin' exact element={<Admin/>} />
                    <Route path='/admin/crearalumno' exact element={<CrearAlumno/>} />
                    <Route path='/admin/editaralumno' exact element={<EditarAlumno/>} />
                    <Route path='/admin/crearprofe' exact element={<CrearProfe/>} />
                    <Route path='/admin/creartarea' exact element={<CrearTarea/>} />
                    <Route path='/admin/crearpaso' exact element={<CrearPaso/>} />
                    <Route path='/admin/editarprofe' exact element={<EditarProfe/>} />
                    <Route path='/admin/editarclase' exact element={<EditarClase/>}/>
                    <Route path='/admin/crearaula' exact element={<CrearAula/>} />
                    <Route path='/confirmaciones' exact element={<ConfirmAccion/>}/>
                    <Route path='/admin/editartareasalumno' exact element ={<EditarTareasAlumno/>}/>
                    <Route path='confirmacioncrearaula' exact element={<Confirmaciones/>}/>
                    <Route path='/tareafinalizada' exact element={<TareaFinalizada/>}/>
                    <Route path='/mostrarpasos/:id/:alumnoId' element={<MostrarPasos/>} />
                    <Route path='/statsalumno' element={<StatsAlumno/>} />

                </Routes>
            </View>
        </NativeRouter>

    )
}

export default Main
