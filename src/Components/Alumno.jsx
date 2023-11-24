import React from 'react'
import {Text, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';


const Alumno = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.text}>
                WORKING ON IT... (ALUMNO)
            </StyledText>
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
    },image:{
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    }
})




export default Alumno