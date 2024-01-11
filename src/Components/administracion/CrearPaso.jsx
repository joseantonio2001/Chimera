import React, {useState, useEffect} from 'react'
import {Text, TextInput, View, Button, StyleSheet, Image, Platform, Pressable} from 'react-native'
import { useLocation, useNavigate } from 'react-router-native';
import StyledText from '../StyledText';
import axios from 'axios';
import StyledTextInput from '../StyledTextInput';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { SelectList } from 'react-native-dropdown-select-list';

const useHost = (nombre) => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050';
    } else {
        return 'http://localhost:5050';
    }
};

const CrearPaso = () => {
    const [img, setImg] = useState(null);
    // const [selectedTarea, setSelectedTarea] = useState(0);
    // const [tareas, setTareas] = useState([]);
    const [idImagen, setIdImagen] = useState('');
    const [descripcion, setDescripcion] = useState("");
    const [pasoCreado, setPasoCreado] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const idTarea = state ? state.idT : '';
    const nPaso = state ? state.numPaso : '';
    const mensaje = "TAREA"

    const handleCreatePaso = async () => {
        // Peticiones para convertir a blob
        const file = await fetch(img.assets[0].uri);
        const theBlob = await file.blob();

        // Convertir a blob para que reconozca como archivo
        const formData = new FormData(); // Formatear datos para enviar peticion
        const filename = img.assets[0].uri.split('/').pop();
        formData.append('file', theBlob, filename);

        // Petición POST MEDIA (SOLO SOPORTADO EN FORMATO WEB, ANDROID hay problemas con los formatos y las peticiones a HTTP)
        axios.post(`${useHost()}/media/imagen`, formData, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
            setIdImagen(response.data[0][0].id)
            // Maneja la respuesta exitosa + Petición POST PASO
            axios.post(`${useHost()}/pasos/crearPaso`, {
                idTarea,
                nPaso,
                idImagen,
                descripcion,
            })
            .then((response) => {
                // Maneja la respuesta exitosa
                setPasoCreado(true);
            })
            .catch((error) => {
                // Maneja los errores
                navigate('/confirmaciones', { state: { mensaje: 'Error al guardar los datos de la tarea.', error }});
            });
            })
        .catch((error) => {
            // Maneja los errores
            console.error("Error al crear estudiante: ",error);
            navigate('/confirmaciones', { state: { mensaje: 'Error en la creación del paso',error } });
        }); 
    };

    const handleVolverTarea = () => {
        navigate('/admin/creartarea', { state: { hayTarea: idTarea , mensajeTarea : mensaje, numPaso : nPaso} });
    }



    const pickImage = async () => {
        const options = {
            mediaType: ImagePicker.MediaTypeOptions.Images
        };
        const response = await ImagePicker.launchImageLibraryAsync(options);
        if(!response.canceled){
                setImg(response);
        }
    };

    useEffect(() => {
        console.log('Navegación hacia crearPaso mandando el ID y en num de paso: ', idTarea, nPaso);
    }, [idTarea, nPaso])

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            {!pasoCreado && (<>
            <StyledText style={styles.titleText}>Paso {nPaso} de la tarea </StyledText>
            
            {img && (   
                <>
                <StyledText style={{textAlign: 'center', fontWeight: '700'}}> 
                    ¡Imagen subida correctamente!
                </StyledText>
                <Image 
                    source={{uri: img.assets[0].uri}}                  
                    style={{width: 250, height: 250, alignSelf: 'center'}}
                    resizeMode="contain"
                />
                </>
            )}
            
            <Pressable style={styles.pressableButton} onPress={pickImage}>
                    <Text style={styles.pressableText}>Subir imagen</Text>
            </Pressable>
            
            <StyledTextInput
                label="Descripción"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />
            <Pressable style={styles.pressableButton} onPress={handleCreatePaso}>
                    <Text style={styles.pressableText}>Crear paso</Text>
            </Pressable>
            <Pressable style={styles.pressableButton} onPress={handleVolverTarea}>
                    <Text style={styles.pressableText}>Volver a la tarea</Text>
            </Pressable>
            </>)}
            {pasoCreado && (
            <>
            <StyledText style={styles.headerText}>¡Paso creado con éxito!</StyledText>
            <Pressable style={styles.pressableButton} onPress={handleVolverTarea}>
                    <Text style={styles.pressableText}>Volver a la tarea</Text>
            </Pressable>
            </>)
            }
        </View>
    );
}

const styles=StyleSheet.create({
    image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        // paddingVertical: 10
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
    textInput:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        width: 500,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    error:{
        borderColor: 'red'
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
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',  // Un tono de gris oscuro, puedes ajustarlo según tus preferencias
        marginTop: 20,
        marginBottom: 10,
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },  
})

export default CrearPaso;
