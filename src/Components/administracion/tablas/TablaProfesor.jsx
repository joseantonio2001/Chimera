import { FlatList, Platform, StyleSheet, Text ,View } from 'react-native';
import {useEffect, useState } from 'react';
import axios from 'axios';

const Cabecera = () => {
        return(
        <View style={styles.header}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Nombre</Text>
            <Text style={styles.headerCell}>Apellido 1</Text>
            <Text style={styles.headerCell}>Apellido 2</Text>
            <Text style={styles.headerCell}>Fecha nacimiento</Text>
            <Text style={styles.headerCell}>Administrador</Text>
        </View>
        );
};

const useHost = () => {
    if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050/profesores';
    } else {
    return 'http://localhost:5050/profesores';
    }
};

const TablaProfesor = () => {
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

    const renderItem = ({ item }) => (
    <View style={styles.row}>
        <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.nombre}</Text>
        <Text style={styles.cell}>{item.apellido1}</Text>
        <Text style={styles.cell}>{item.apellido2}</Text>
        <Text style={styles.cell}>{item.fecha_nac}</Text>
        <Text style={styles.cell}>{item.admin}</Text>
    </View>
    );

    return (
    <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <Cabecera />
        {/* Datos de la tabla */}
        <FlatList 
        data={filas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        />
    </View>
    );
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default TablaProfesor;