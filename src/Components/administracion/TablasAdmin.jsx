import * as React from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Button } from 'react-native';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-native';


const botonesAcciones = (params, nombre) => {
  const [bdialogAbierto, setbDialogAbierto] = React.useState(false);
  const [filaEliminar, setFilaEliminar] = React.useState(null);

  const handleDelete = (nombre) => {
      switch(nombre){
        case 'estudiantes':
          axios.delete('http://localhost:5050/estudiantes/borrarAlumno/'+params.row.id);
        break;
        case 'profesores':
          axios.delete('http://localhost:5050/profesores/borrarProfe/'+params.row.id);
        break;
        case 'tareas':
          axios.delete('http://localhost:5050/tareas/borrarTarea/'+params.row.id);
        break;
        case 'clases':
          axios.delete('http://localhost:5050/clases/borrarClase/'+params.row.id);
        break;
      }
      setbDialogAbierto(false);
      setFilaEliminar(null);
  };

  const handleDeleteConfirmation = (fila) => {
    setFilaEliminar(fila);
    setbDialogAbierto(true);
  };

  return(
    <div>
    <IconButton
      variant="outlined"
      color="primary"
      onClick={() => handleEdit(params.row.id)}
    >
      <EditIcon/>
    </IconButton>
    <IconButton
      variant="outlined"
      color="secondary"
      onClick={() => handleDeleteConfirmation(params.row)}
    >
      <DeleteIcon/>
    </IconButton>

    <Dialog open={bdialogAbierto} onClose={() => setbDialogAbierto(false)}>
      <DialogTitle>¡Cuidado!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar esta fila {filaEliminar ? filaEliminar.nombre : ''}? 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onPress={() => setbDialogAbierto(false)} title='Cancelar'/>
        <Button onPress={() => handleDelete(nombre)} title='Eliminar' color='#b71c1c'/>
      </DialogActions>
      </Dialog>
    </div>
  );
};

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
        {field: 'preferencias', headerName: 'Preferencia', width: 150},
        {field: 'acciones', headerName: 'Acciones', width: 100, renderCell: (params) => botonesAcciones(params,props.nombre)}
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
        {field: 'admin', headerName: 'Administrador', width: 100},
        {field: 'acciones', headerName: 'Acciones', width: 100, renderCell: (params) => botonesAcciones(params,props.nombre)}
        ]);
        break;
      case 'tareas':
        setColumnas([ // Columnas de la tabla a mostrar
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'nombre', headerName: 'Nombre', width: 150},
        {field: 'descripcion', headerName: 'Descripción', width: 200},
        {field: 'imagenes', headerName: 'Imágenes', width: 150},
        {field: 'video', headerName: 'Vídeo', width: 100},
        {field: 'tipo', headerName: 'Tipo', width: 50},
        {field: 'acciones', headerName: 'Acciones', width: 100, renderCell: (params) => botonesAcciones(params,props.nombre)}
        ]);
        break;
      case 'clases':
        setColumnas([ // Columnas de la tabla a mostrar
        {field: 'id', headerName: 'ID', width: 50},
        {field: 'capacidad', headerName: 'Capacidad', width: 150},
        {field: 'id_profesor', headerName: 'ID Profesor', width: 100},
        {field: 'id_estudiante', headerName: 'ID Estudiante', width: 100},
        {field: 'acciones', headerName: 'Acciones', width: 100, renderCell: (params) => botonesAcciones(params,props.nombre)}
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
      case 'tareas':
        navigate('/admin/creartarea');
      break;
      default:
        console.log('Todavía no configurado');
      break;
    }
  };

  return (
    <GridToolbarContainer>
      <IconButton onClick={handleClick}>
        <AddIcon/>
      </IconButton>
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