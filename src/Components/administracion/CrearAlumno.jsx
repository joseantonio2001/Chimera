import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import {useState} from 'react'


const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/estudiantes';
    } else {
      return 'http://localhost:5050/estudiantes';
    }
};

const CrearAlumno = ()=>{
    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [preferencias, setPreferencias] = useState(0);
    const [hidePass, setHidePass] = useState(true);
    /* Diferencia entre fechas debido a que en BD se introduce cómo string */
    const [bdDate, setbdDate] = useState(''); 
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowDate(false);
        setDate(selectedDate);
        setbdDate((date.toISOString().split('T')[0]));
    };

    const showDatePicker = () => {
        setShowDate(true);
    }



    const handleCreateAlumno = () => {

        if (!date) {
            // Maneja el error de fecha no seleccionada
            return;
        }
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post(`${useHost()}/crearAlumno`, {
            nombre,
            apellido1,
            apellido2,
            contraseña,
            preferencias,
            fechaNac: bdDate
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmaciones', { state: { mensaje: '¡Alumno creado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            console.error("Error al crear estudiante: ",error);
            navigate('/confirmaciones', { state: { mensaje: 'Error en la creación del alumno',error } });
        });
        
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Crear un Nuevo Alumno</StyledText>
            
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

            <StyledText style={styles.text}>Contraseña: </StyledText>
            <StyledTextInput
            label="Contraseña"
            secureTextEntry={hidePass}
            value={contraseña}
            onChangeText={text => setContraseña(text)}
            right={<TextInput.Icon icon="eye" onPress={() => setHidePass(!hidePass)} />}
            />
            <StyledText style={styles.text}>Preferencias: </StyledText>
            <StyledTextInput
                label="Preferencias"
                value={preferencias.toString()}
                keyboardType="numeric" 
                onChangeText={text => setPreferencias(parseInt(text))}
            />

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleCreateAlumno}>
                    <Text style={styles.pressableText}>Crear Alumno</Text>
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




export default CrearAlumno