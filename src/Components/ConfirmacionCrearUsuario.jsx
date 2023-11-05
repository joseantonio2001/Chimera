import React from 'react'
import {Text, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate, useLocation } from 'react-router-native';
import StyledText from './StyledText';


function ConfirmarCrearUsuario (props){
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };
    const { state } = useLocation();
    const mensaje = state ? state.mensaje : '';



    return(
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.text}>{mensaje}</StyledText>
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
    text: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '700',
        marginTop: 100,
        marginBottom: 100
    }
})




export default ConfirmarCrearUsuario