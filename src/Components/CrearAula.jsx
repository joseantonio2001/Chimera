import React, { useState } from 'react'
import { Text, TextInput, View, Button, StyleSheet, Image } from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';
import StyledTextInput from './StyledTextInput';


const CrearAula = () => {
    const navigate = useNavigate();

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    const [id, setId] = useState('');
    const [capacidad, setCapacidad] = useState('');


    const handleCreateAula = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post('http://localhost:5050/api/crearAula', {
            id,
            capacidad
        })
            .then((response) => {
                // Maneja la respuesta exitosa
                navigate('/confirmacioncrearaula', { state: { mensaje: 'Aula creada con éxito!' } });
            })
            .catch((error) => {
                // Maneja los errores
                navigate('/confirmacioncrearaula', { state: { mensaje: 'Error en la creación del aula', error } });
            });

    };

    return (
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
            <StyledText style={styles.titleText}>Crear un Nuevo Alumno</StyledText>

            <StyledText style={styles.text}>Identificador del Aula:</StyledText>
            <StyledTextInput
                placeholder="ID"
                value={id}
                onChangeText={text => setId(text)}
            />

            <StyledText style={styles.text}>Capacidad del Aula:</StyledText>
            <StyledTextInput
                placeholder="Capacidad"
                value={capacidad}
                onChangeText={text => setCapacidad(text)}
            />

            <View style={styles.button}>
                <Button title="Crear Aula" onPress={handleCreateAula} />
            </View>

            <View style={styles.button}>
                <Button title='Volver al menú de administración' onPress={() => handleButtonClick('/admin')} />
            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    image: {
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    button: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 15
    },
    titleText: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    }, mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    }, mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    }
})




export default CrearAula