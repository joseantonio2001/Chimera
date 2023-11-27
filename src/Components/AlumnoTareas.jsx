import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import { Text, View, Button, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { useNavigate, useLocation } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';


const AlumnoTareas = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const id = state ? state.id : '';
    const [nombreEstudiante, setEstudiante] = useState('');
    const [apellido1Estudiante, setApellido1Estudiante] = useState('');
    const [apellido2Estudiante, setApellido2Estudiante] = useState('');
    //Añadir aqui para extraer las tareas

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    const getDatosEstudiante = () => {
        axios.get(`http://localhost:5050/estudiantes/${id}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((estudiante) => {
                        setEstudiante(estudiante.nombre);
                        setApellido1Estudiante(estudiante.apellido1);
                        setApellido2Estudiante(estudiante.apellido2);
                        //Añadir aqui para extraer las tareas
                    });
                }
            })
            .catch((error) => {
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            });
    };



    useEffect(() => {
        getDatosEstudiante();
    }, [])

    return (
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
            <View>
                <StyledText style={styles.text}>Lista de tareas</StyledText>
            </View>
            <View style={styles.view}>
                <StyledText style={styles.text2}> Bienvenido de nuevo, {nombreEstudiante} {apellido1Estudiante} {apellido2Estudiante}:  </StyledText>
            </View>
            <View style={styles.columnContainer}>
                <TouchableOpacity style={styles.column} onPress={() => handleButtonClick('/tareas')}>
                    <StyledText style={styles.text3}>Tareas de Hoy</StyledText>
                    <Image style={styles.imageTareas} source={require('../../data/img/Tareas.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.column} onPress={() => handleButtonClick('/comandas')}>
                    <StyledText style={styles.text3}>Comandas</StyledText>
                    <Image style={styles.imageTareas} source={require('../../data/img/Comandas.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.column} onPress={() => handleButtonClick('/pedido-material')}>
                    <StyledText style={styles.text3}>Pedido de material</StyledText>
                    <Image style={styles.imageTareas} source={require('../../data/img/Material.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.pressableButton}>
                <Button title='Volver' onPress={() => handleButtonClick('/estudiante')} />
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
        paddingVertical: 10,
        marginBottom: 20
    },
    pressableButton: {
        width: 100,
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
        fontSize: 40,
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 35
    },
    text2: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 5,
        marginBottom: 35
    },
    text3: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
        marginTop: 5,
        marginBottom: 35
    },
    view: {
        alignSelf: 'center'
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    column: {
        flex: 1,
    },
    imageTareas: {
        width: 238,
        height: 230,
        borderRadius: 4,
        alignSelf: 'center'
    }
})



export default AlumnoTareas