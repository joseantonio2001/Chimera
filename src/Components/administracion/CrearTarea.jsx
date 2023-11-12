import React, {useState} from 'react'
import {Text, TextInput, View, Button, StyleSheet, Image, FlatList} from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from '../StyledText';
import axios from 'axios';
import StyledTextInput from '../StyledTextInput';
import ImagePicker from 'react-native-image-picker';


const CrearTarea = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    const [id, setID] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [portada, setPortada] = useState('');
    const [numPasos, setNumPasos] = useState('');
    const [listaPasos, setListaPasos] = useState([]);

    const incrementarNumPasos = () => {
        setNumPasos(numPasos + 1);
    };

    const agregarPaso = (paso) => {
        setListaPasos([...listaPasos, paso]);
    };

    
    const handleCreateTarea = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post('http://localhost:5050/tareas/crearTarea', {
            nombre,
            descripcion
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            // navigate('/confirmacioncreartarea', { state: { mensaje: '¡Tarea creada con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmacioncreartarea', { state: { mensaje: 'Error en la creación de la tarea',error } });
        });
        
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Crear una Nueva Tarea </StyledText>
            
            {/* Nombre */}
            <StyledText style={styles.text}>Nombre:</StyledText>
            <StyledTextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />

            {/* Descripción */}
            <StyledText style={styles.text}>Descripcion: </StyledText>
            <StyledTextInput
                placeholder="Descripcion"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />

            {/* Portada */}
            <StyledText style={styles.text}>Portada (opcional) : </StyledText>
            <StyledTextInput
                placeholder="Portada"
                value={portada}
                onChangeText={text => setPortada(text)}
            />

            <StyledText style={styles.text}>Pasos de la tarea:</StyledText>


            <StyledText style={styles.titleText}>Crear pasos: </StyledText>
            handleCreateTarea
            
            {/* <SquareButton title="Paso" onPress={() => handleButtonClick('/admin/crearpaso', { numPasos, nombre, incrementarNumPasos, agregarPaso })}/> */}

            
            <View style={styles.button}>
                <Button title="Crear Tarea" onPress={handleCreateTarea} />
            </View>

            <View style={styles.button}>
                <Button title='Volver al menú de administración' onPress={() => handleButtonClick('/admin')}/>
            </View>
            
        </View>
        
    )
}
const styles=StyleSheet.create({
    image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    button: {
        width:200, 
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
    text:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    },mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    }
})


export default CrearTarea