import React, {useState} from 'react'
import {Text, TextInput, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate } from 'react-router-native';
import ImagePicker from 'react-native-image-picker';
import StyledText from '../StyledText';
import axios from 'axios';
import StyledTextInput from '../StyledTextInput';


const CrearPaso = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    const [tarea, setTarea] = useState('');
    const [imagen, setImagen] = useState('');
    const [nPaso, setNpaso] = useState('');
    const [descripcion, setDescripcion] = useState('');

    axios.get('http://localhost:5050/pasos/crearPaso', {
        

    })

    const handleUploadPhoto = () => {
        axios.post('http://localhost:5050/pasos/crearPaso', {
            imagen
        })
        .then((response) => {
            console.log('response', response);
        })
        .catch((error) => {
            console.log('error', error);
        });
    };
     
    const handleCreatePaso = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post('http://localhost:5050/pasos/crearPaso', {
            descripcion,
            tarea,
            nPaso
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmacioncrearpaso', { state: { mensaje: '¡Paso creado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmacioncrearpaso', { state: { mensaje: 'Error en la creación del paso',error } });
        });
        
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Paso {nPaso} de la tarea {tarea}: </StyledText>
           
           
           {/* Algo para seleccionar imagen */}
            {imagen && <Image source={{ uri: imagen }} style={styles.imagenSeleccionada} />}
            <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />

            {/* Descripcion de la tarea */}
            <StyledText style={styles.text}>Descripcion: </StyledText>
            <StyledTextInput
                placeholder="Descripcion"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />

            <View style={styles.button}>
                <Button title="Crear Paso" onPress={handleCreatePaso} />
            </View>

            <View style={styles.button}>
                <Button title='Volver a la tarea' onPress={() => handleButtonClick('/admin/creartarea')}/>
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

export default CrearPaso