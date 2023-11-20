import { DataTable, FAB, IconButton} from 'react-native-paper';
import { Platform, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

const Cabecera = () => {
  return (
    <DataTable.Header>
      <DataTable.Title>ID</DataTable.Title>
      <DataTable.Title>Nombre</DataTable.Title>
      <DataTable.Title>Apellido 1</DataTable.Title>
      <DataTable.Title>Apellido 2</DataTable.Title>
      <DataTable.Title>Fecha nacimiento</DataTable.Title>
      <DataTable.Title>Preferencia</DataTable.Title>
      <DataTable.Title>Acciones</DataTable.Title>
    </DataTable.Header>
  );
};

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/estudiantes';
  } else {
    return 'http://localhost:5050/estudiantes';
  }
};

const TablaEstudiante = () => {
  const [filas, setFilas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [itemsPorPagina] = useState(10); // Ajustar preferencia
  const host = useHost();
  const navigate = useNavigate();

  const handleAdd = () => { // Función añadir
    navigate('/admin/crearalumno');
  };

  const handleDelete = (id) => { // Función borrar
    axios.delete(`${useHost()}/borrarAlumno/${id}`)
    .then((response) => {
      navigate('/confirmaciones', { state: { mensaje: '¡Alumno eliminado con éxito!' } });
      })
      .catch((error) => console.error('Error al eliminar:', error));
  };

	const handleEdit = (ide) => {
		navigate('/admin/editaralumno', { state: { id: ide }})
	};

  const handlePageChange = (page) => {  
    setPagina(page);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(host);
        const resultado = response.data[0];
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
  }, [host, pagina]); // dependencia para que useEffect se ejecute cuando cambie

  return (
    <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <Cabecera />
      {/* Datos de la tabla */}
      <DataTable>
        {filas.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.nombre}</DataTable.Cell>
            <DataTable.Cell>{item.apellido1}</DataTable.Cell>
            <DataTable.Cell>{item.apellido2}</DataTable.Cell>
            <DataTable.Cell>{item.fecha_nac}</DataTable.Cell>
            <DataTable.Cell>{item.preferencias}</DataTable.Cell>
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

const styles = StyleSheet.create({
  table: {
    margin: 10,
    },
    fabStyle: {
     	bottom: -250, // Modificar posición
      right: 16,
      position: 'absolute',
    }
});

export default TablaEstudiante;
