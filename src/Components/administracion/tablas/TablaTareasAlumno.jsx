import { DataTable, IconButton} from 'react-native-paper';
import { Platform, StyleSheet, View} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

const Cabecera = () => {
  return (
    <DataTable.Header>
      <DataTable.Title style={styles.idColumnTitle}>ID</DataTable.Title>
      <DataTable.Title style={styles.nombreColumnTitle}>Nombre y apellidos</DataTable.Title>
      <DataTable.Title style={styles.tareasColumnTitle}>Tareas del Alumno</DataTable.Title>
      <DataTable.Title style={styles.accionesColumnTitle}>Asignación de Tareas</DataTable.Title>
    </DataTable.Header>
  );
};

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050';
  } else {
    return 'http://localhost:5050';
  }
};

const TablaTareasAlumno = ({ idClase, idProfesor }) => {

  const [filas, setFilas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [itemsPorPagina] = useState(10); // Ajustar preferencia
  const host = useHost();
  const navigate = useNavigate();

  const getTareasAlumno = async (idAlumno) => {
    try {
      const response = await axios.get(`${useHost()}/tareas/alumnoId/${idAlumno}`);
      const tareas = response.data; // No asumas que es un array

      if (tareas && tareas.length > 0) {
        console.log('Hay tareas', tareas);
        // El alumno tiene tareas asignadas, devolver la lista de nombres unidos por comas
        return tareas.map((tarea) => tarea.nombre).join(', ');
      } else {
        console.log('No hay tareas');
        // El alumno no tiene tareas asignadas
        return 'NINGUNA';
      }
    } catch (error) {
      console.error('Error al obtener tareas del alumno:', error);
      // Manejar errores de la solicitud
      throw error;
    }
  }


	const handleEdit = (idAlumno, nombreAlumno, apellido1Alumno, apellido2Alumno, idClase, idProfesor) => {
		navigate('/admin/editartareasalumno', { state: { idAlumno, nombreAlumno, apellido1Alumno, apellido2Alumno, idClase, idProfesor}})
	};

  const handlePageChange = (page) => {
    setPagina(page);
  };

  const getAlumnos = async (idClase) => {
    try {
      const response = await axios.get(`${useHost()}/estudiantes/clases/${idClase}`);
      const resultado = response.data[0];

      const alumnosConTareas = await Promise.all(
        resultado.map(async (alumno) => {
          const tareas = await getTareasAlumno(alumno.id);
          return {
            ...alumno,
            tareas,
          };
        })
      );

      console.log('Alumnos con tareas:', alumnosConTareas);

      // Aplicar la paginación
      const inicio = (pagina - 1) * itemsPorPagina;
      const fin = inicio + itemsPorPagina;
      const filasPaginadas = alumnosConTareas.slice(inicio, fin);
      setFilas(filasPaginadas);
    } catch (error) {
      console.error('Error en la solicitud GET:', error);
    }
  };

  useEffect(() => {
    getAlumnos(idClase);
  }, [host, pagina, idClase]); // dependencia para que useEffect se ejecute cuando cambie

  return (

    <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <Cabecera />
      {/* Datos de la tabla */}
      <DataTable>
        {filas.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.idColumnTitle}>{item.id}</DataTable.Cell>
            <DataTable.Cell style={styles.nombreColumnTitle}>{item.nombre} {item.apellido1} {item.apellido2}</DataTable.Cell>
            <DataTable.Cell style={styles.tareasColumnTitle}>{item.tareas}</DataTable.Cell>
            {/* Botones de las filas */}
            <View style={styles.accionesColumnTitle}>
                <IconButton icon="pencil" onPress={() => handleEdit(item.id, item.nombre, item.apellido1, item.apellido2, idClase, idProfesor)} style={styles.accionesColumnTitle}/>
            </View>
          </DataTable.Row>
        ))}
        <DataTable.Pagination
        page={pagina} /* Página actual */
        numberOfPages={Math.ceil(filas.length / itemsPorPagina)} /* Paginas = Filas/itemsXPagina */
        onPageChange={handlePageChange}
        label={`${pagina} de ${Math.ceil(filas.length / itemsPorPagina)}`} // Etiqueta
      />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
    },
    fabStyle: {
      width: 55,
     backgroundColor: '#049CDC',
     alignSelf: 'center',
     justifyContent: 'center',
   },
   idColumnTitle: {
    flex: 1,
    alignItems: 'right',
    fontWeight: 'bold'
  },
  nombreColumnTitle: {
    flex: 3, // Ajusta según sea necesario para equilibrar las columnas
    alignItems: 'flex-start',
    fontWeight: 'bold'
  },
  tareasColumnTitle: {
    flex: 2,
    alignItems: 'flex-start',
    fontWeight: 'bold'
  },
  accionesColumnTitle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Alineación a la izquierda
    paddingHorizontal: 0.5, // Espaciado horizontal entre los elementos (ajustado a 8)
    alignItems: 'center', // Alineación vertical
    fontWeight: 'bold'
  }
});

export default TablaTareasAlumno;