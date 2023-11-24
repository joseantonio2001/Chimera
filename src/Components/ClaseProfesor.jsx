import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import {Text, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate, useLocation } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';


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

    const getClaseProfe = async () => {
            try{  
                const response = await axios.get(`http://localhost:5050/profesor/clases/${id}`);
                const resultado = response.data;
                setIdClase(resultado);
                await getDatosAlumnos(resultado);
            }catch(error){
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            };
    };

    const getDatosProfe = () => {
        axios.get(`http://localhost:5050/profesores/${id}`)
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
        axios.get(`http://localhost:5050/estudiantes/clases/${idClase}`)
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
            <StyledText style={styles.text}>La clase del profesor {nombreProfe} {apellido1Profe} {apellido2Profe}  (ID: {idProfe}) es la clase {idClase}.  </StyledText>
                <StyledText style={styles.text}>Los alumnos de esta clase son:  </StyledText>
            </View>

            {alumnos.map((alumno) => (
                <View style={styles.view}>
                    <StyledText styles={styles.text} key={alumno.id}>ID {alumno.id}: {alumno.nombre} {alumno.apellido1} {alumno.apellido2}</StyledText>
                </View>
            ))}
            <View style={styles.pressableButton}>
                <Button title='Volver' onPress={() => handleButtonClick('/profesor')}/>
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
        paddingVertical: 10,
        marginBottom: 100
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