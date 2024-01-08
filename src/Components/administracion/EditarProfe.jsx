import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import { Switch } from 'react-native-paper';
import axios from 'axios';
import dayjs from 'dayjs';

const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/profesores';
    } else {
      return 'http://localhost:5050/profesores';
    }
};

const EditarProfe = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    const { state } = useLocation();
    const id = state ? state.id : '';
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [admin, setAdmin] = useState(false);
     /* Diferencia entre fechas debido a que en BD se introduce cómo string */
     const [date, setDate] = useState(new Date());
     const [bdDate, setbdDate] = useState(''); 
     const [showDate, setShowDate] = useState(false);
 
     const onChange = (event, selectedDate) => {
         setShowDate(false);
         setDate(selectedDate); // Fecha componente
         setbdDate((date.toISOString().split('T')[0])); // Fecha BD
     };
 
     const showDatePicker = () => {
         setShowDate(true);
     }

    const toggleAdmin = () => {
        setAdmin(!admin);
    };
    const getDatosProfe = () => {
        axios.get(`${useHost()}/${id}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((profe) => {
                        setNombre(profe.nombre);
                        setApellido1(profe.apellido1);
                        setApellido2(profe.apellido2);
                        setAdmin(profe.admin);
                        if(admin) toggleAdmin();
                        setDate(new Date(profe.fecha_nac));
                        setbdDate(profe.fecha_nac.split('T')[0]);
                        
                    });
                }
            })
            .catch((error) => {
                // Manejar los errores
                console.error('Error en la solicitud GET:', error);
            });
    };

    const handleEditProfe = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.put(`${useHost()}/actualizarProfe`, {
            id,
            nombre,
            apellido1,
            apellido2,
            admin,
            fechaNac: bdDate
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmaciones', { state: { mensaje: '¡Profesor editado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmaciones', { state: { mensaje: 'Error en la edición del profesor',error } });
        });
        
    };

    useEffect(() => {
        getDatosProfe();
      }, [])

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Editar Profesor ID: {id}</StyledText>
            
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
            <StyledText style={styles.text}>La fecha actual de nacimiento es {dayjs(date).format('DD/MM/YYYY')}. Si desea cambiarla introduzca una nueva:</StyledText>
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
                display="default"
                format={'YYYY-MM-DD'}
                onChange={onChange}
                />
                )}
            </View>
            <StyledText style={styles.text}>Perfil de administración: </StyledText>
            <Switch style={styles.switch}
                value={admin}
                onValueChange={toggleAdmin}
                trackColor={{false: 'grey', true: 'blue'}}
                thumbColor={admin ? '#f5dd4b' : '#f4f3f4'}
            />

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleEditProfe} >
                    <Text style={styles.pressableText}>Editar profesor</Text>
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
    titleText:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
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
        marginTop: 20,
        marginBottom: 10,
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
    switch:{
        alignSelf: 'center'
    }
})



export default EditarProfe