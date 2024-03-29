import React, {useState, useEffect} from 'react'
import {Text, TextInput, View, Button, StyleSheet, Image} from 'react-native'
import { useLocation, useNavigate } from 'react-router-native';
// import ImagePicker from 'react-native-image-picker';
import StyledText from '../StyledText';
import axios from 'axios';
import StyledTextInput from '../StyledTextInput';



const CrearPaso = ()=>{
    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        navigate(enlace);
    };

    // Traer de CrearTarea el id de la tarea y el numero de paso correspondiente
    const { state } = useLocation();
    const idTarea = state ? state.idT : '';
    const nPaso = state ? state.numPaso : '';
    const mensaje = "Actualizar cambios"

    // // Input imagen y descripción
    const [imagen, setImagen] = useState('');
    const [descripcion, setDescripcion] = useState('');

    
    const handleCreatePaso = () => {
        navigate('/admin/creartarea', { state: { hayTarea: idTarea , mensajeTarea : mensaje} });
    };

    useEffect(() => {
        console.log('Navegación hacia crearTarea mandando el ID que recibo: ', idTarea);
    }, [idTarea])

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Paso {nPaso} de la tarea {idTarea}: </StyledText>
           
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