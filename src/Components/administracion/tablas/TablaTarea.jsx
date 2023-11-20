import { Platform, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { DataTable} from 'react-native-paper';
import axios from 'axios';

const Cabecera = () => {
        return(
          <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Tipo</DataTable.Title>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Descripción</DataTable.Title>
        </DataTable.Header>
        );
};

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/tareas';
  } else {
    return 'http://localhost:5050/tareas';
  }
};

const TablaTarea = () => {
  const [filas, setFilas] = useState([]);
  const host = useHost();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(host);
        const resultado = response.data[0];
        setFilas(resultado);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [host]); // Agregar `host` como dependencia para que useEffect se ejecute cuando cambie

    return (
      <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <Cabecera />
      {/* Datos de la tabla */}
      <DataTable>
        {filas.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.tipo}</DataTable.Cell>
            <DataTable.Cell>{item.nombre}</DataTable.Cell>
            <DataTable.Cell>{item.descripcion}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
    );
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
    }
});

export default TablaTarea;