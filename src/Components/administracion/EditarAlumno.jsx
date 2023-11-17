import React, {useState, useEffect} from 'react'
import { View, Button, StyleSheet, Image} from 'react-native'
import { useNavigate, useLocation } from 'react-router-native';
import StyledText from '../StyledText';
import axios from 'axios';
import StyledTextInput from '../StyledTextInput';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


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
    const [preferencias, setPreferencias] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(Date);
    const [fechaNacimientoBD, setFechaNacimientoBD] = useState(Date);

    const getDatosAlumno = () => {
        axios.get(`http://localhost:5050/estudiantes/${id}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((alumno) => {
                        setNombre(alumno.nombre);
                        setApellido1(alumno.apellido1);
                        setApellido2(alumno.apellido2);
                        setPreferencias(alumno.preferencias);
                        
                        const fechaNacimientoDB = new Date(alumno.fecha_nac);
                        setFechaNacimientoBD(alumno.fecha_nac);
    
                        const año = fechaNacimientoDB.getFullYear();
                        const mes = String(fechaNacimientoDB.getMonth() + 1).padStart(2, '0');
                        const dia = String(fechaNacimientoDB.getDate()).padStart(2, '0');
                        const fechaFormateada = `${año}/${mes}/${dia}`;
    
                        setFechaNacimiento(fechaFormateada);
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

        const fechaNacimientoAEnviar = selectedDate || fechaNacimientoBD;
        const fechaFormateada = dayjs(fechaNacimientoAEnviar).format('YYYY-MM-DD');
        console.log('Fecha a insertar en BD; ', fechaFormateada);
      
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.put('http://localhost:5050/estudiantes/actualizarAlumno', {
            id,
            nombre,
            apellido1,
            apellido2,
            preferencias,
            fechaNac: fechaFormateada
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmacioncrearusuario', { state: { mensaje: '¡Alumno editado con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmacioncrearusuario', { state: { mensaje: 'Error en la edición del alumno',error } });
        });
        
    };

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Editar Alumno ID: {id}</StyledText>
           <StyledText>FechaBD {String(fechaNacimientoBD)}</StyledText>
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

            <StyledText style={styles.text}>La fecha actual de nacimiento es {fechaNacimiento}. Si desea cambiarla introduzca una nueva:</StyledText>
            <StyledText style={styles.text}>Fecha de nacimiento: [AAAA/MM/DD]</StyledText>
            <View style={styles.calendarContainer}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Introduzca una fecha"
                        format="YYYY/MM/DD"
                        style={styles.calendar}
                        onChange={(selectedDate) => setSelectedDate(selectedDate)}
                        renderInput={(props) => <StyledTextInput {...props} />}
                    />
                </LocalizationProvider>
            </View>
            <StyledText style={styles.text}>Preferencias: </StyledText>
            <StyledTextInput
                placeholder="Preferencias"
                value={preferencias}
                onChangeText={text => setPreferencias(parseInt(text))}
            />

            <View style={styles.button}>
                <Button title="Editar Alumno" onPress={handleEditAlumno} />
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
    },
    calendar:{
        width:20, 
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 1
    },
    calendarContainer: {
        maxWidth: 250,
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 1,
      }
})

export default EditarAlumno