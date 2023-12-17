import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import {Text, TouchableOpacity,View, Button, StyleSheet, Image, Platform, Pressable} from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';


const Profesor = ()=>{
    const [profesores, setProfesores] = useState([]);
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace, id) => {
        
        navigate(enlace, { state: { id:id }});
    };

    const useHost = () => {
        if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050/profesores';
        } else {
        return 'http://localhost:5050/profesores';
        }
    };

    const getProfes = () => {
        axios.get(useHost())
        .then((response) => {
            const resultado = response.data[0];
            if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                setProfesores(resultado);
            }
        })
        .catch((error) => {
            // Manejar los errores
            console.error('Error en la solicitud GET:', error);
        });
    };


    useEffect(() => {
        getProfes();
    }, [])

    return(
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>
            <View>
                <Text style={styles.text}>Seleccione un profesor para ver más información de su clase: </Text>
            </View>
            {profesores.map((profesor) => (
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => handleButtonClick('/claseprofesor', profesor.id)}>
                            <Text styles={styles.text} key={profesor.id}>ID {profesor.id}: {profesor.nombre} {profesor.apellido1} {profesor.apellido2}</Text>
                        </TouchableOpacity>
                    </View>
            ))}

            

            
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
        paddingVertical: 10,
        marginBottom: 100
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
    text: {
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20,
        color: 'black'
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
    view:{
        alignSelf: 'center'
    }
})



export default Profesor