import {Image, Pressable, StyleSheet,Text, View } from 'react-native'
import {  useLocation, useNavigate } from 'react-router-native';
import StyledText from '../StyledText';
import { useEffect, useState } from 'react';

const ConfirmAccion = () => {
    const navigate = useNavigate();
    const handleButtonClick = (enlace, id) => {
        if (id) {
            navigate(enlace, id);
        } else {
            navigate(enlace);
        }
    };
    const[datosGuardados, setDatosGuardados] = useState(false);
    const { state } = useLocation();
    const mensaje = state ? state.mensaje : '';
    const ruta = state ? state.ruta : '';
    const mensajeBoton = state ? state.mensajeBoton : '';
    const id = state ? state.id : '';

    const hayDatos = () => {
        console.log('Mensaje: ', mensaje, '\nRuta', ruta,'\nMensaje para el boton: ', mensajeBoton);
        return (ruta && id && ruta.length>0 && id.length>0) || (ruta && mensajeBoton && ruta.length>0 && mensajeBoton.length>0);
    }
    useEffect(() => {
        if (hayDatos()){
            setDatosGuardados(true);
            /*
                Comprobar el mensaje boton para saber si no hay --> Volver al menú
            */
        }
    }, [state, mensaje, ruta, mensajeBoton, id])

/*     const handleButtonClick = () => {
        if (state && state.id && state.path) {
            navigate(state.path, { state: { id: state.id } });
          } else {
            navigate('/admin');
          }
    }; */

    return(
        <View>
            {/* <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.headerText}>{mensaje}</StyledText>
            <Pressable style={styles.pressableButton} onPress={() => handleButtonClick()}>
                <Text style={styles.pressableText}>Volver</Text>
            </Pressable> */}

            { datosGuardados && (
                <View>
                    <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
                    <StyledText style={styles.headerText}>{mensaje}</StyledText>
                    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick(ruta, id)}>
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
        backgroundColor: '#049CDC',  // Un verde fresco, puedes cambiarlo según tus preferencias
        borderRadius: 10,
        elevation: 3, // Sombra para un efecto de elevación
        marginBottom: 15,
        marginTop: 50,
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

export default ConfirmAccion;