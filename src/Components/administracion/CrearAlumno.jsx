import React, {useState} from 'react'
import {Text, TextInput, View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from '../StyledText';
import axios from 'axios';
import StyledTextInput from '../StyledTextInput';


const CrearAlumno = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    const [id, setID] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [preferencias, setPreferencias] = useState('');
    const [fechaNac, setFechaNac] = useState('');

    const handleCreateAlumno = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post('http://localhost:5050/estudiantes/crearAlumno', {
            nombre,
            apellido1,
            apellido2,
            contraseña,
            preferencias,
            fechaNac
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmacioncrearusuario', { state: { mensaje: '¡Alumno creado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmacioncrearusuario', { state: { mensaje: 'Error en la creación del alumno',error } });
        });
        
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Crear un Nuevo Alumno</StyledText>
            
            <StyledText style={styles.text}>Nombre y apellidos:</StyledText>
            <StyledTextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />
            <StyledTextInput
                placeholder="Apellido 1"
                value={apellido1}
                onChangeText={text => setApellido1(text)}
            />
            <StyledTextInput
                placeholder="Apellido 2"
                value={apellido2}
                onChangeText={text => setApellido2(text)}
            />
            <StyledText style={styles.text}>Fecha de nacimiento: [AAAA/MM/DD]</StyledText>
            <StyledTextInput
                placeholder="Fecha de nacimiento"
                value={fechaNac}
                onChangeText={text => setFechaNac(text)}
            />
            <StyledText style={styles.text}>Contraseña: </StyledText>
            <StyledTextInput
                placeholder="Contraseña"
                value={contraseña}
                onChangeText={text => setContraseña(text)}
            />
            <StyledText style={styles.text}>Preferencias: </StyledText>
            <StyledTextInput
                placeholder="Preferencias"
                value={preferencias}
                onChangeText={text => setPreferencias(parseInt(text))}
            />

            <View style={styles.button}>
                <Button title="Crear Alumno" onPress={handleCreateAlumno} />
            </View>

            <View style={styles.button}>
                <Button title='Volver al menú de administración' onPress={() => handleButtonClick('/admin')}/>
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
    button: {
        width:200, 
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 15
    },
    titleText: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20
    },
    text:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    },mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    }
})




export default CrearAlumno