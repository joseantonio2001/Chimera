import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import PanelAdmin from './PanelAdmin';
import StyledText from '../StyledText';
import { useNavigate } from 'react-router-native';

const Admin = ()=>{
    
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    return(
        <View style={{flex: 1}} /* Para tab visible definir esto o altura del componente parent */>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.headerText}>MENÚ DE ADMINISTRACIÓN</StyledText>
            <PanelAdmin/>
            <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/')}>
                <Text style={styles.pressableText}>Volver a inicio</Text>
            </Pressable>
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





export default Admin