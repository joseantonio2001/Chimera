// Estudiantes.js
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Button, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';

const Estudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = (enlace, id) => {
        navigate(enlace, { state: { id: id } });
    };

    const getEstudiantes = () => {
        axios.get(`http://localhost:5050/estudiantes`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    setEstudiantes(resultado);
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud GET de estudiantes:', error);
            });
    };

    useEffect(() => {
        getEstudiantes();
    }, []);

    return (
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
            <StyledText style={styles.text}>Seleccione un estudiante para ver información de este: </StyledText>
            {estudiantes.map((estudiante) => (
                <View style={styles.view} key={estudiante.id}>
                    <TouchableOpacity onPress={() => handleButtonClick('/tareasestudiante', estudiante.id)}>
                        <StyledText styles={styles.text}>ID {estudiante.id}: {estudiante.nombre} {estudiante.apellido1} {estudiante.apellido2}</StyledText>
                    </TouchableOpacity>
                </View>
            ))}
            <View style={styles.pressableButton}>
                <Button title='Volver a Inicio' onPress={() => handleButtonClick('/')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 100
    },
    pressableButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#049CDC',  // Un verde fresco, puedes cambiarlo según tus preferencias
        borderRadius: 10,
        elevation: 3, // Sombra para un efecto de elevación
        marginBottom: 15,
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20
    },
    view: {
        alignSelf: 'center'
    }
})

export default Estudiantes;
