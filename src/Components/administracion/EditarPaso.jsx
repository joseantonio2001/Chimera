import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';

const useHost = (campo) => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/'+campo;
    } else {
      return 'http://localhost:5050/'+campo;
    }
};

const EditarPaso = () => {
    const { state } = useLocation();
    const pasoId = state ? state.id : '';
    const [img, setImg] = useState(null);
    const [tareaId, setTareaId] = useState(0);
    const [npaso, setnPaso] = useState(0);
    const [nueva, setNueva] = useState(false);
    const [volverTarea, setVolverTarea] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();

    const pickImage = async () => {
        const options = {
            mediaType: ImagePicker.MediaTypeOptions.Images
        };
        const response = await ImagePicker.launchImageLibraryAsync(options);
        if(!response.canceled){
                setImg(response.assets[0].uri);
                setNueva(true); // Bool comprueba cambio en img
        }
    };

    const getDatosPaso = async () => {
        axios.get(`${useHost('pasos/')}+${pasoId}`)
        .then((response) => {
        if (response && response > 0){
            setImg(response.data[0][0].imagen);
            setTareaId(response.data[0][0].id_tarea);
            setnPaso(response.data[0][0].n_paso);
            setDescripcion(response.data[0][0].descripcion);
        }
        }).catch((error) => {console.error('Error al realizar la solicitud:', error);});
    };

    const handleEdit = async () => {
        let file, filename;
        if(nueva){
            file = await fetch(img);
            filename = img.split('/').pop();
        }
        else{
            file = await fetch(`${useHost(img)}`);
            filename = img.split('/').pop().split('.')[0]; // Quitar extension del anterior
        }

        const blob = await file.blob();
        // Convertir a blob para que reconozca como archivo
        const formData = new FormData(); // Formatear datos para enviar peticion
        formData.append('file', blob, filename);
        formData.append('id',pasoId);
        formData.append('n_paso',npaso);
        formData.append('descripcion',descripcion);
        axios.put(`${useHost('pasos/actualizarPaso')}`, formData,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            }).then((response) => {
                handleBack();
            }) .catch((error) => {
                // Maneja los errores
                console.error("Error al crear estudiante: ",error);
                navigate('/confirmaciones', { state: { mensaje: 'Error en la creación del paso',error } });
            }); 
    }

    useEffect(() => {
        if (tareaId !== 0) setVolverTarea(true);
    },[tareaId]);

    const handleBack = () => {
        console.log("Desde (EditarPaso) a (EditarTarea=CrearTarea) - [hayTarea : ", tareaId, ", mensajeTarea : 'TAREA', numPaso : ", npaso," ]")
        navigate('/admin/creartarea', { state: { hayTarea: tareaId , mensajeTarea : 'TAREA', numPaso : npaso} });
    };

    useEffect(() => {
        getDatosPaso();
    },[pasoId, tareaId]);

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Modificar paso</StyledText>
            <StyledText style={styles.text}>Identificador de paso: {pasoId} </StyledText>
            <StyledText style={styles.text}>Nombre</StyledText>
            <StyledTextInput
            label="Número de paso"
            value={npaso}
            onChangeText={text => setnPaso(parseInt(text))}
            />
            <StyledTextInput
            label="Descripción"
            value={descripcion}
            onChangeText={text => setDescripcion(text)}
            />
            {img && nueva ? (
                    <>
                        <StyledText>Imagen subida</StyledText>
                        <Image 
                        source={{ uri: img }}
                        style={{ width: 200, height: 200 }}
                        resizeMode="contain"
                        />
                    </>
                    ) : (
                    <Image
                        source={{ uri: `${useHost(img)}` }}
                        style={{ width: 200, height: 200 }}
                        resizeMode="contain"
                    />
                    )}
            <Pressable style={styles.pressableButton} onPress={pickImage}>
                    <Text style={styles.pressableText}>Subir imagen</Text>
            </Pressable>
            <Pressable style={styles.pressableButton} onPress={handleEdit}>
                    <Text style={styles.pressableText}>Editar paso</Text>
            </Pressable>
            <Pressable style={styles.pressableButton} onPress={handleBack}>
                    <Text style={styles.pressableText}>Volver atrás</Text>
            </Pressable>

        </View>
    )
};

const styles=StyleSheet.create({
    image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    text:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    mensajeError: {
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
    titleText: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20
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

export default EditarPaso;