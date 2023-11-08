import React from 'react'
import { View, Image, StyleSheet, Button } from 'react-native'
import StyledText from './StyledText'
import { useNavigate } from 'react-router-native'


const Inicio = () => {
    const navigate = useNavigate();

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    return (
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
            <StyledText style={styles.text}>PÁGINA DE INICIO</StyledText>
            <View style={styles.button}>
                <Button style={styles.buttonComponent} title='Alumno' onPress={() => handleButtonClick('/alumno')} />
            </View>
            <View style={styles.button}>
                <Button style={styles.buttonComponent} title='Profesor' onPress={() => handleButtonClick('/profesor')} />
            </View>
            <View style={styles.button}>
                <Button style={styles.buttonComponent} title='Administración' onPress={() => handleButtonClick('/admin')} />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    image: {
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    button: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 15
    },
    buttonContainer: {
        flexDirection: 'row', // Alinea los botones horizontalmente
        justifyContent: 'space-around', // Espacio uniforme entre los botones
        width: '80%', // Ancho deseado para el contenedor de botones
        marginTop: 20,
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

export default Inicio