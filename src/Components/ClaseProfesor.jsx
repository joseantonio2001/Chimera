import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import {Text, View, Button, StyleSheet, Image, Platform, Pressable} from 'react-native'
import { useNavigate, useLocation } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';
import TablaTareasAlumno from './administracion/tablas/TablaTareasAlumno';


const ClaseProfesor = ()=>{
    const navigate = useNavigate();
    const { state } = useLocation();
    const id = state ? state.id : '';
    const [nombreProfe, setNombreProfe] = useState('');
    const [idProfe, setIdProfe] = useState('');
    const [apellido1Profe, setApellido1Profe] = useState('');
    const [apellido2Profe, setApellido2Profe] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [idClase, setIdClase]=useState();

    
    const handleButtonClick = (enlace) => {
        navigate(enlace);
    };

    const useHost = () => {
        if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050';
        } else {
        return 'http://localhost:5050';
        }
    };

    const getClaseProfe = async () => {
            try{  
                const response = await axios.get(`${useHost()}/profesor/clases/${id}`);
                const resultado = response.data;
                setIdClase(resultado);
                await getDatosAlumnos(resultado);
            }catch(error){
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            };
    };

    
    
    const getDatosProfe = () => {
        axios.get(`${useHost()}/profesores/${id}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((profe) => {
                        setIdProfe(profe.id);
                        setNombreProfe(profe.nombre);
                        setApellido1Profe(profe.apellido1);
                        setApellido2Profe(profe.apellido2);
                    });
                }
            })
            .catch((error) => {
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            });
    };

    const getDatosAlumnos = (idClase) => {
        axios.get(`${useHost()}/estudiantes/clases/${idClase}`)
        .then((response) => {
            const resultado = response.data[0];
            if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                setAlumnos(resultado);
            }
        })
        .catch((error) => {
            // Manejar los errores
            console.error('Error en la solicitud GET:', error);
        });
    };


    useEffect(() => {
        getClaseProfe();
        getDatosProfe();
      }, [])

    return(
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
            <View>
                <Text style={styles.text}>La clase del profesor {nombreProfe} {apellido1Profe} {apellido2Profe}  (ID: {idProfe}) es la clase {idClase}.  </Text>
            </View>
            <View>    
                <Text style={styles.text}>Los alumnos de esta clase son:  </Text>
            </View>
            <View>
                <TablaTareasAlumno idClase={idClase} idProfesor={id} />
            </View>
            <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/profesor')}>
                <Text style={styles.pressableText}>Volver</Text>
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
        paddingVertical: 10,
        marginBottom: 100
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
    pressableButton: {
        width: 100,
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
    text: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20
    },
    view:{
        alignSelf: 'center'
    }
})



export default ClaseProfesor