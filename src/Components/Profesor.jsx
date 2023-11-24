import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import {Text, TouchableOpacity,View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';


const Profesor = ()=>{
    const [profesores, setProfesores] = useState([]);
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace, id) => {
        
        navigate(enlace, { state: { id:id }});
    };

    const getProfes = () => {
        axios.get(`http://localhost:5050/profesores`)
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
            <StyledText style={styles.text}>Seleccione un profesor para ver más información de su clase: </StyledText>
            {profesores.map((profesor) => (
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => handleButtonClick('/claseprofesor', profesor.id)}>
                            <StyledText styles={styles.text} key={profesor.id}>ID {profesor.id}: {profesor.nombre} {profesor.apellido1} {profesor.apellido2}</StyledText>
                        </TouchableOpacity>
                    </View>
            ))}

            
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
        paddingVertical: 10,
        marginBottom: 100
    },
    button: {
        width:200, 
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 150
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


export default Profesor