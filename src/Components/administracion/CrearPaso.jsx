import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { SelectList } from 'react-native-dropdown-select-list'
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';


const useHost = (nombre) => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050/'+nombre;
    } else {
        return 'http://localhost:5050/'+nombre;
    }
};
	
const CrearPaso = () => {
    const [img, setImg] = useState(null);
    const [nPaso, setNPaso] = useState(''); // No deja number en textinput (?)
    const [selectedTarea, setSelectedTarea] = useState(0);
    const [tareas, setTareas] = useState([]);
    const [descripcion, setDescripcion] = useState("");
    const navigate = useNavigate();

    const handleCreatePaso = async () => {
        // Peticiones para convertir a blob
        const file = await fetch(img.assets[0].uri);
        const theBlob = await file.blob();

        // Convertir a blob para que reconozca como archivo
        const formData = new FormData(); // Formatear datos para enviar peticion
        const filename = img.assets[0].uri.split('/').pop();
        formData.append('file', theBlob, filename);
        formData.append('n_paso',parseInt(nPaso));
        formData.append('id_tarea',selectedTarea);
        formData.append('descripcion',descripcion);
        // Petición POST (SOLO SOPORTADO EN FORMATO WEB, ANDROID hay problemas con los formatos y las peticiones a HTTP)
        axios.post(`${useHost('pasos/crearPaso')}`, formData, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmaciones', { state: { mensaje: '¡Paso creado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            console.error("Error al crear estudiante: ",error);
            navigate('/confirmaciones', { state: { mensaje: 'Error en la creación del paso',error } });
        }); 
        
    };

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
        const fetchData = async () => {
            try {
                const response = await axios.get(useHost('tareas'));
                const resultado = response.data[0];
                // Map clave-valor las tareas
                const mappedResult = resultado.map((tarea) => {
                    return {key: tarea.id,
                            value: tarea.nombre+" - "+tarea.descripcion};
                })
                setTareas(mappedResult);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };
        fetchData();
    },[]);

    return(
        <View>
            <StyledText style={styles.headerText}>Crear pasos</StyledText>
            <StyledTextInput
                label="Número de paso"
                value={nPaso}
                keyboardType = 'numeric'
                onChangeText={(text) => setNPaso(text)}
            />
            {img && (   
                <>
                <StyledText>Imagen subida</StyledText>
                <Image
                    source={{uri: img.assets[0].uri}}                  
                    style={{width: 200, height: 200}}
                    resizeMode="contain"
                />
                </>
            )}
            <Pressable style={styles.pressableButton} onPress={pickImage}>
                    <Text style={styles.pressableText}>Subir imagen</Text>
            </Pressable>
            <View style={{alignItems: 'center'}}>
            <SelectList boxStyles={{width: 300}}
                setSelected={(value) => setSelectedTarea(value)}
                data={tareas}
                save="key"
            />
            </View>
            <StyledTextInput
                label="Descripción"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />
            <Pressable style={styles.pressableButton} onPress={handleCreatePaso}>
                    <Text style={styles.pressableText}>Crear paso</Text>
            </Pressable>
        </View>
    );
}

const styles=StyleSheet.create({
    image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
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
    pressableButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#4CAF50',  // Un verde fresco, puedes cambiarlo según tus preferencias
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