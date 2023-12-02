import {Image, Pressable, StyleSheet,Text, View } from 'react-native'
import {  useLocation, useNavigate } from 'react-router-native';
import StyledText from '../StyledText';
import { useEffect, useState } from 'react';


function confirmAccion (){
    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        navigate(enlace);
    };
    const[datosGuardados, setDatosGuardados] = useState(false);
    const { state } = useLocation();
    const mensaje = state ? state.mensaje : '';
    const ruta = state ? state.ruta : '';
    const mensajeBoton = state ? state.mensajeBoton : '';

    const hayDatos = () => {
        console.log('Mensaje: ', mensaje, '\nRuta', ruta,'\nMensaje para el boton: ', mensajeBoton);
        return (ruta && mensajeBoton && ruta.length>0 && mensajeBoton.length>0);
    }
    useEffect(() => {
        if (hayDatos()){
            setDatosGuardados(true);
        }
    }, [state, mensaje, ruta, mensajeBoton])

    return(
        <View>
            { datosGuardados && (
                <View>
                    <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
                    <StyledText style={styles.headerText}>{mensaje}</StyledText>
                    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick(ruta)}>
                        <Text style={styles.pressableText}>{mensajeBoton}</Text>
                    </Pressable>
                </View>
            )}     
            { !datosGuardados && (
                <View>
                    <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
                    <StyledText style={styles.headerText}>{mensaje}</StyledText>
                    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
                        <Text style={styles.pressableText}>Volver al menú</Text>
                    </Pressable>
                </View>
            )}
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

export default confirmAccion;