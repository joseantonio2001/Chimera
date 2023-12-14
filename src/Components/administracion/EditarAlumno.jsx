import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';

const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/estudiantes';
    } else {
      return 'http://localhost:5050/estudiantes';
    }
};

const EditarAlumno = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };  

    const { state } = useLocation();
    const id = state ? state.id : '';
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [preferencias, setPreferencias] = useState(0);
    /* Diferencia entre fechas debido a que en BD se introduce cómo string */
    const [date, setDate] = useState(new Date());
    const [bdDate, setbdDate] = useState(''); 
    const [showDate, setShowDate] = useState(false);

    const changeDate = (event, selectedDate) => {
        setShowDate(false);
        setDate(new Date(selectedDate)); // Fecha componente
        setbdDate((date.toISOString().split('T')[0])); // Fecha BD
    };

    const showDatePicker = () => {
        setShowDate(true);
    }

    const getDatosAlumno = () => {
        axios.get(`${useHost()}/${id}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((alumno) => {
                        setNombre(alumno.nombre);
                        setApellido1(alumno.apellido1);
                        setApellido2(alumno.apellido2);
                        setPreferencias(alumno.preferencias);
                        setDate(new Date(alumno.fecha_nac));
                        setbdDate(alumno.fecha_nac.split('T')[0]);
                    });
                }
            })
            .catch((error) => {
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            });
    };

    useEffect(() => {
        getDatosAlumno();
    }, [])

    const handleEditAlumno = () => {

        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.put(`${useHost()}/actualizarAlumno`, {
            id,
            nombre,
            apellido1,
            apellido2,
            preferencias,
            fechaNac: bdDate
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmaciones', { state: { mensaje: '¡Alumno editado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmaciones', { state: { mensaje: 'Error en la edición del alumno',error } });
        });
        
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Editar Alumno ID: {id}</StyledText>
            <StyledText>FechaBD {bdDate}</StyledText>
            <StyledText style={styles.text}>Nombre y apellidos:</StyledText>
            <StyledTextInput
                label="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />
            <StyledTextInput
                label="Apellido 1"
                value={apellido1}
                onChangeText={text => setApellido1(text)}
            />
            <StyledTextInput
                label="Apellido 2"
                value={apellido2}
                onChangeText={text => setApellido2(text)}
            />

            <StyledText style={styles.text}>La fecha actual de nacimiento es {date.toString()}. Si desea cambiarla introduzca una nueva:</StyledText>
            <StyledText style={styles.text}>Fecha de nacimiento: [AAAA/MM/DD]</StyledText>
            <View>
                <Pressable style={styles.pressableButton} onPress={showDatePicker}>
                    <Text style={styles.pressableText}>Seleccionar fecha</Text>
                </Pressable>
                {showDate && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                format={'YYYY-MM-DD'}
                display="default"
                onChange={changeDate}
                />
                )}
            </View>
            <StyledText style={styles.text}>Preferencias: </StyledText>
            <StyledTextInput
                label="Preferencias"
                value={preferencias.toString()}
                keyboardType="numeric" 
                onChangeText={text => setPreferencias(parseInt(text))}
            />

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleEditAlumno} >
                    <Text style={styles.pressableText}>Editar estudiante</Text>
                </Pressable>
            </View>

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
                    <Text style={styles.pressableText}>Volver atrás</Text>
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
    text:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    },mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
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

export default EditarAlumno