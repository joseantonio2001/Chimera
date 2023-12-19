import {Image, Pressable, Text, View} from "react-native";
import StyledText from "../StyledText";
import {useNavigate} from "react-router-native";

const TareaFinalizada = () => {
    const navigate = useNavigate();

        const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    return (
        <View>
            <StyledText style={styles.headerText}>¡Bien hecho!</StyledText>
            <Image source={require('../../../assets/celebrar.png')} style={styles.image}></Image>
            <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/estudiante')}>
                <Text style={styles.pressableText}>Volver a inicio</Text>
            </Pressable>
        </View>
    );
}

const styles = {
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginTop: 50,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
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
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
  };

export default TareaFinalizada;