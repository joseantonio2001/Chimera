import React from 'react'
import {View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';


const Admin = ()=>{
    
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.text}>MENÚ DE ADMINISTRACIÓN</StyledText>
            <View style={styles.button}>
                <Button title='Crear Alumno' onPress={() => handleButtonClick('/crearalumno')}/>
            </View>
            <View style={styles.button}>
                <Button title='Crear Profesor' onPress={() => handleButtonClick('/crearprofe')}/>
            </View>
            <View style={styles.button}>
                <Button title='Crear Aula' onPress={() => handleButtonClick('/crearaula')}/>
            </View>
            <View style={styles.button}>
                <Button title='Volver a Inicio' onPress={() => handleButtonClick('/')}/>
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





export default Admin