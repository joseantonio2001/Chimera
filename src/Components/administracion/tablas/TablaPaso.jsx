import { Platform, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-native';
import { DataTable, FAB, IconButton } from 'react-native-paper';
import axios from 'axios';
import PropTypes from 'prop-types';

const Cabecera = () => {
        return(
          <DataTable.Header>
          <DataTable.Title>ID de tarea</DataTable.Title>
          <DataTable.Title>Nombre de tarea</DataTable.Title>
          <DataTable.Title>Número de paso</DataTable.Title>
          <DataTable.Title>Descripción del paso</DataTable.Title>
        </DataTable.Header>
        );
};

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/pasosTarea';
  } else {
    return 'http://localhost:5050/pasosTarea';
  }
};

const TablaPaso = (props) => {
  const [filas, setFilas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [itemsPorPagina] = useState(3); // Ajustar preferencia
  const host = useHost();
  const navigate = useNavigate();
  const {idTarea, paso, nombreTarea} = props;
  const [numeroPaso, setNumeroPaso] = useState(0);
  
  
  const handleAdd = () => {
    navigate('/admin/tareas/crearpaso', {state : {idT : idTarea, numPaso : numeroPaso}}); // PASAR PARAMETROS ID_TAREA Y NUMERO DE PASO
  }
  
  const handleDelete = (id) => { // Función borrar
    axios.delete(`${useHost()}/borrarPaso/${id}`)
    .then((response) => {             // quitar la ruta y mensajeBoton si se puede
      console.log("Desde (TablaPaso) a (Confirmaciones) - [mensaje : 'Tarea eliminada con éxito!', ruta : '/admin', mensajeBoton : 'Volver al menú']");
      navigate('/confirmaciones', { state: { mensaje: 'Tarea eliminada con éxito!', ruta : '/admin', mensajeBoton : 'Volver al menú'} });
      })
      .catch((error) => console.error('Error al eliminar:', error));
  };

  // EDITAR PASO
  const handleEdit = (ide) => {
    console.log("Desde (TablaPaso) a (EditarPaso) - [id : ", ide, "]")
    navigate('/admin/tareas/editarpaso', {state : { id : ide }})
		// navigate('/admin/tareas/crearpaso', { state: { id: ide }})
	};

  const handlePageChange = (page) => {  
    setPagina(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${useHost()}/${idTarea}`);
        const resultado = response.data[0];
        const ultimoPaso = resultado.reduce((maxPaso, paso) => {
        return paso.n_paso > maxPaso.n_paso ? paso : maxPaso;
        }, resultado[0]);
        if (ultimoPaso.n_paso !== undefined) setNumeroPaso(ultimoPaso.n_paso+1);
        // Aplicar la paginación
        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const filasPaginadas = resultado.slice(inicio, fin);
        setFilas(filasPaginadas);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    fetchData();
  }, [idTarea, pagina]); // Agregar `host` como dependencia para que useEffect se ejecute cuando cambie

  useEffect(() => {
    setNumeroPaso(parseInt(paso)+1);
}, [paso])

    return (
      <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <Cabecera />
      {/* Datos de la tabla */}
      <DataTable>
        {filas.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={{ flex: 1 }}>{item.id_tarea}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>{nombreTarea}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>Paso {item.n_paso}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>{item.descripcion}</DataTable.Cell>
            {/* Botones de las filas */}
            <IconButton icon="pencil" onPress={() => handleEdit(item.id)} />
            <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
            </DataTable.Row>
        ))}
        <DataTable.Pagination
        page={pagina} /* Página actual */
        numberOfPages={Math.ceil(filas.length / itemsPorPagina)} /* Paginas = Filas/itemsXPagina */
        onPageChange={handlePageChange}
        label={`${pagina} de ${Math.ceil(filas.length / itemsPorPagina)}`} // Etiqueta
      />
      </DataTable>

      <FAB
        icon="plus"
        style={styles.fabStyle}
        onPress={() => handleAdd()}
      />
    </View>
    );
};

TablaPaso.propTypes = {
  idTarea: PropTypes.string.isRequired,
  paso: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
    height: 270,
    },
    fabStyle: {
     	bottom: -5, 
      left: 8,
      position: 'absolute',
    }
});

export default TablaPaso;