import { Platform, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-native';
import { DataTable, FAB } from 'react-native-paper';
import axios from 'axios';
import PropTypes from 'prop-types';

const Cabecera = () => {
        return(
          <DataTable.Header>
          <DataTable.Title>Nº paso</DataTable.Title>
          <DataTable.Title>Tipo</DataTable.Title>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Descripción</DataTable.Title>
        </DataTable.Header>
        );
};

const useHost = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/pasos';
  } else {
    return 'http://localhost:5050/pasos';
  }
};

const TablaPaso = (props) => {
  const [filas, setFilas] = useState([]);
  const host = useHost();
  const navigate = useNavigate();
  const {idTarea, paso} = props;

  const [numPaso, setNumPaso] = useState(0);

  const handleAdd = () => {
    navigate('/admin/crearpaso', {state : {idT : idTarea, numPaso : paso }}); // PASAR PARAMETROS ID_TAREA Y NUMERO DE PASO
  }

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
            <DataTable.Cell>{item.nombre}</DataTable.Cell>
            <DataTable.Cell>{item.tipo}</DataTable.Cell>
            <DataTable.Cell>{item.descripcion}</DataTable.Cell>
            </DataTable.Row>
        ))}
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
    height: 170,
    },
    fabStyle: {
     	bottom: -5, 
      right: 30,
      position: 'absolute',
    }
});

export default TablaPaso;