import * as React from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Button } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native';



const formatoColumnas = (props) => {
  const [columnas, setColumnas] = React.useState([]); 
  React.useEffect(() => {
    switch (props.nombre) {
      case 'estudiantes':
        setColumnas([ // Columnas de la tabla a mostrar
        {field: 'avatar', headerName: 'Perfil', width: 25},
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'nombre', headerName: 'Nombre', width: 150},
        {field: 'apellido1', headerName: 'Apellido 1', width: 150},
        {field: 'apellido2', headerName: 'Apellido 2', width: 150},
        {field: 'f_nac', headerName: 'Fecha nacimiento', width: 125},
        {field: 'password', headerName: 'Contraseña', width: 200},
        {field: 'preferencias', headerName: 'Preferencia', width: 150}
        ]);
        break;
      case 'profesores':
        setColumnas([ // Columnas de la tabla a mostrar
        {field: 'avatar', headerName: 'Perfil', width: 25},
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'nombre', headerName: 'Nombre', width: 150},
        {field: 'apellido1', headerName: 'Apellido 1', width: 150},
        {field: 'apellido2', headerName: 'Apellido 2', width: 150},
        {field: 'f_nac', headerName: 'Fecha nacimiento', width: 125},
        {field: 'password', headerName: 'Contraseña', width: 200},
        {field: 'admin', headerName: 'Administrador', width: 100}
        ]);
        break;
      case 'tareas':
        setColumnas([ // Columnas de la tabla a mostrar
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'nombre', headerName: 'Nombre', width: 150},
        {field: 'descripcion', headerName: 'Descripción', width: 200},
        {field: 'imagenes', headerName: 'Imágenes', width: 150},
        {field: 'video', headerName: 'Vídeo', width: 100},
        {field: 'tipo', headerName: 'Tipo', width: 50}
        ]);
        break;
      case 'clases':
        setColumnas([ // Columnas de la tabla a mostrar
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'capacidad', headerName: 'Capacidad', width: 150},
        {field: 'id_profesor', headerName: 'ID Profesor', width: 100},
        {field: 'id_estudiante', headerName: 'ID Estudiante', width: 100}
        ]);
        break;
    }
  }, [props.nombre]);

  return columnas;
  } 


const obtenerLista =  (props) => {
  const [host, setHost] = React.useState('');
  React.useEffect(() => { // Uso useEffect debido a que se utiliza un parametro de la componente
    switch(props.nombre){// Depende del valor del nombre
      case 'estudiantes':
        setHost('http://localhost:5050/estudiantes');
        break;
      case 'profesores':
        setHost('http://localhost:5050/profesores');
        break;
      case 'tareas':
        setHost('http://localhost:5050/tareas');
        break;
      case 'clases':
        setHost('http://localhost:5050/clases');
        break;
    }
  });

  const [filas,setFilas] = React.useState([]);
  React.useEffect(() => {
    axios.get(host)
    .then((response) => {
        const resultado = response.data[0];
        if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
            const filas = resultado.map((fila) => {
              switch(props.nombre){
                case 'estudiantes':
                    return {
                      avatar: fila.img_perfil,
                      id: fila.id,
                      nombre: fila.nombre,
                      apellido1: fila.apellido1,
                      apellido2: fila.apellido2,
                      f_nac: fila.fecha_nac,
                      password: fila.PASSWORD,
                      preferencias: fila.preferencias
                    };
                case 'profesores':
                    return {
                      avatar: fila.img_perfil,
                      id: fila.id,
                      nombre: fila.nombre,
                      apellido1: fila.apellido1,
                      apellido2: fila.apellido2,
                      f_nac: fila.fecha_nac,
                      password: fila.PASSWORD,
                      admin: fila.admin
                    };
                default: // En caso de tareas o clases no hace falta reorganizarlo de todas formas
                  return fila;
              }
            });
            setFilas(filas);
    }})
    .catch((error) => { // Maneja errores
    console.error('Error al realizar la solicitud:', error);
    throw error;
    }); 
  }, [host, props.nombre]);

return filas;
};

const toolBar = (props) => { // Toolbar custom del panel de DataGrid
  const navigate = useNavigate();
  const handleClick = () => { 
    switch(props.nombre){
      case 'estudiantes':
        navigate('/admin/crearalumno');
      break;
      case 'profesores':
        navigate('/admin/crearprofe');
      break;
      default:
        console.log('Todavía no configurado');
      break;
    }
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onPress={handleClick}>
        Añadir {props.nombre}
      </Button>
    </GridToolbarContainer>
  );
}


const TablasAdmin = (props) => {
    const filas = obtenerLista(props);
    const columnas = formatoColumnas(props);
    const nombre = props.nombre;
    return(
      <Box>
        <DataGrid rows={filas} columns={columnas}
        slots={{
          toolbar: (props) => toolBar(props),
        }}
        slotProps={{
          toolbar: {nombre},
        }}
        />
      </Box>
    )
}

export default TablasAdmin;