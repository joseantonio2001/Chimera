import { Platform, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { DataTable, FAB, IconButton } from 'react-native-paper';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

const CabeceraInventario = () => {
  return (
    <DataTable.Header>
      <DataTable.Title>ID</DataTable.Title>
      <DataTable.Title>Nombre</DataTable.Title>
      <DataTable.Title>Cantidad</DataTable.Title>
      <DataTable.Title>Acciones</DataTable.Title>
    </DataTable.Header>
  );
};

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/inventario';
  } else {
    return 'http://localhost:5050/inventario';
  }
};

const TablaInventario = () => {
  const [filas, setFilas] = useState([]);
  const host = useHost();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/admin/crearitem'); // Cambia la ruta según tus necesidades
  };

  const handleDelete = (id) => {
    axios
      .delete(`${useHost()}/borrarElemento/${id}`)
      .then((response) => {
        navigate('/confirmaciones', {
          state: { mensaje: 'Elemento eliminado con éxito!', ruta: '/admin', mensajeBoton: 'Volver al menú' },
        });
      })
      .catch((error) => console.error('Error al eliminar:', error));
  };

  const handleEdit = (ide) => {
    navigate('/admin/editaritem', { state: { id: ide } })
  };

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
  }, [host]);

  return (
    <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <CabeceraInventario />
      {/* Datos de la tabla */}
      <DataTable>
        {filas.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.nombre}</DataTable.Cell>
            <DataTable.Cell>{item.cantidad}</DataTable.Cell>
            <IconButton icon="pencil" onPress={() => handleEdit(item.id)} />
            <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
          </DataTable.Row>
        ))}
      </DataTable>
      <FAB
        icon="plus"
        style={styles.fabStyle}
        color="white"
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
    width: 55,
    backgroundColor: '#049CDC',
    alignSelf: 'right',
    justifyContent: 'center',
  },
});

export default TablaInventario;