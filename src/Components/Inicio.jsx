import {Image,  Pressable, StyleSheet, Text, View} from 'react-native'
import StyledText from './StyledText'
import {useNavigate} from 'react-router-native'


const Inicio = ()=>{
    const navigate = useNavigate();
    const handleButtonClick = (enlace) => {
        navigate(enlace, { state: { id: 2 }})
    };

    return(
        <View>
                <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
                <StyledText style={styles.headerText}>PÁGINA DE INICIO</StyledText>
                <View style={styles.view}>
                    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/estudiante')}>
                        <Text style={styles.pressableText}>Estudiante</Text>
                    </Pressable>
                    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/profesor')}>
                        <Text style={styles.pressableText}>Profesor</Text>
                    </Pressable>
                    <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
                        <Text style={styles.pressableText}>Administrador</Text>
                    </Pressable> 
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
        marginTop: 50,
        marginBottom: 10,
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
    view:{
        marginTop: 50
    } 
})

export default Inicio
