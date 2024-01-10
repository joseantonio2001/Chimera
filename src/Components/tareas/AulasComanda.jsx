import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import StyledText from '../StyledText.jsx';
import axios from 'axios';



const useHost = (nombre) => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050/'+nombre;
    } else {
        return 'http://localhost:5050/'+nombre;
    }
};


const AulasComanda = () => {
    const [aulasId, setAulasId] = useState([]);
    const [profesoresId, setProfesorId] = useState([]); // Correspondencia Aula - Profesor
    const [nombresProfesores, setNombresProfesores] = useState([]);
    
    const navigate = useNavigate();

    const getAulas = async () => {
        try {
            const response = await axios.get(useHost('clases'));
            const resultado = response.data[0];
            if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                const aux = resultado.map((aula) => aula.id);
                setAulasId(aux);
            }
        } catch (error) {
            // Handle errors
            console.error('Error al realizar solicitud a clases:', error);
        }
    };

    const getProfesores = async () => {
      try {
        const profesoresAuxId = [];
        for (const aulaId of aulasId) {
          const response = await axios.get(`${useHost('clases/profesores/')}${aulaId}`);
          const resultado = response.data[0].id_profesor;
          profesoresAuxId.push(resultado);
        }
        setProfesorId(profesoresAuxId);
      } catch (error) {
        // Manejar los errores
        console.error('Error en la solicitud GET:', error);
      }
    };

    const getNombresProfesores = async () => {
        try {
          const nombresProfesoresAux = [];
          for (const profesorId of profesoresId) {
            const response = await axios.get(`${useHost('profesores')}/${profesorId}`);
            const resultado = response.data[0][0].nombre;
            nombresProfesoresAux.push(resultado);
          }
          setNombresProfesores(nombresProfesoresAux);
        } catch (error) {
          // Manejar los errores
          console.error('Error en la solicitud GET:', error);
        }
    };
    

    useEffect(() => {
    getAulas();
    }, []);

    useEffect(() => {
    getProfesores();
    }, [aulasId]);

    useEffect(() => {
        getNombresProfesores();
    },[profesoresId]);

    // Function to show boxes from each class
    const showBoxes = () => {
        const boxes = [];
        for (let i = 0; i < aulasId.length; i++) {
            boxes.push(
                <View key={i}>
                    <Pressable accessibilityRole="button" accessibilityLabel="Seleccionar aula" style={styles.pressableButton} onPress={() => {navigate('/tareaComanda/menu', { state: { aulaId: aulasId[i], profesorId: profesoresId[i], nombreProfesor: nombresProfesores[i] }})}} >
                    <Text style={styles.pressableText}>{aulasId[i]}</Text>
                    <Text accessibilityRole="text" accessibilityLabel={nombresProfesores[i]} style={styles.pressableText}>{nombresProfesores[i]}</Text>
                    </Pressable>
                </View>
            )
        }
        return boxes;
    }

    return (
        // Test view
        <View accessible={true}>
            <StyledText accessibilityRole="header" accessibilityLabel="Comanda" style={styles.headerText}>Comanda</StyledText>
            <Text accessibilityRole="text" accessibilityLabel="Selecione un aula de profesor" style={styles.headerText}>Seleccione un aula de profesor</Text>
            <View accessible={true} accessibilityRole="grid" style={styles.flexView}>
                {showBoxes()}
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Volver atras" style={styles.pressableButton} onPress={() => navigate('/')} >
                <Text style={styles.pressableText}>Volver atras</Text>
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
    }, 
    flexView:{
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 10
    }
})

export default AulasComanda;

