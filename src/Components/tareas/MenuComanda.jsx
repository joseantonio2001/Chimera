import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper';
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

const MenuComanda = () => {
    const { state } = useLocation();
    const idAula = state ? state.aulaId : '';
    const idProfesor = state ? state.profesorId : '';
    const nombreProfesor = state ? state.nombreProfesor : '';
    const [estudiantes, setEstudiantes] = useState([]);

    const navigate = useNavigate();

    const getEstudiantes = ()    => {
        axios.get(useHost('estudiantes/clases/'+idAula)).then(response => {
            setEstudiantes(response.data[0]);
        }).catch(error => {
            console.log(error);
            console.error('Error al obtener la lista de estudiantes:', error);
        });
            
    }

    useEffect(() => {
        getEstudiantes();
    },[idAula]);




    const showBoxes = () => {
        const boxes = [];
        for (let i = 0; i < estudiantes.length; i++) {
            boxes.push(
                <View accessible={true} key={i}>
                    <View style={styles.container}>
                    <Pressable
                        accessibilityRole="button"
                        accesibilityLabel="Botón seleccionar estudiante"
                        accessibilityHint="Selecciona un estudiante"
                        style={styles.pressableButton}
                        onPress={() => { navigate('/tareaComanda/menu/seleccion', { state: { estudiante: estudiantes[i], lastState: { idAula: idAula, idProfesor: idProfesor, nombreProfesor: nombreProfesor } } }); }}
                    >
                        <Text accesibilityRole="text" accesibilityLabel={estudiantes[i].nombre}   style={styles.pressableText}>{estudiantes[i].nombre}</Text>
                        <Text accesibilityRole="text" accesibilityLabel={estudiantes[i].apellido1} style={styles.pressableText}>{estudiantes[i].apellido1}</Text>
                    </Pressable>
                    </View>
                </View>
            )
        }
        return boxes;
    }

    return(
        <View accessible={true}>
            <StyledText accessibilityRole="header" accesibilityLabel="Comanda" style={styles.headerText}>Comanda</StyledText>
            <Text accessibilityRole="text" accesibilityLabel="Selecione un estudiante" style={styles.headerText}>Seleccione un estudiante</Text>
            {showBoxes()}
            <Pressable 
                  accessibilityRole="button"
                  accessibilityLabel="Volver atrás"
                  style={styles.pressableButton} onPress={() => navigate('/tareaComanda')}>
                  <Text style={styles.pressableText}>Volver atrás</Text>
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

export default MenuComanda;
