import React, { useState, useEffect } from 'react'; // Añade 'useEffect'
import { Text, Picker, View, Button, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import StyledMultiSelect from '../StyledMultiSelect';




const CrearAula = () => {
    const navigate = useNavigate();

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    const [id, setId] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);


    useEffect( () => {
        // Realiza una solicitud GET al servidor para obtener la lista de profesores
        axios.get('http://localhost:5050/profesores')
            .then((response) => {
                setProfesores(response.data[0]); // Almacena la lista de profesores en el estado
            })
            .catch((error) => {
                console.error('Error al obtener la lista de profesores: ' + error);
            });
        axios.get('http://localhost:5050/estudiantes')
            .then((response) => {
                setEstudiantes(response.data[0]); // Almacena la lista de estudiantes en el estado
            })
            .catch((error) => {
                console.error('Error al obtener la lista de estudiantes: ' + error);
            });
    }, []);

    const handleCreateAula = () => {
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post('http://localhost:5050/clases/crearAula', {
            id,
            capacidad,
            id_profesor: selectedProfesor,
            estudiantes: selectedEstudiantes
        })
            .then((response) => {
                // Maneja la respuesta exitosa
                navigate('/confirmacioncrearaula', { state: { mensaje: 'Aula creada con éxito!' } });
            })
            .catch((error) => {
                // Maneja los errores
                navigate('/confirmacioncrearaula', { state: { mensaje: 'Error en la creación del aula', error } });
            });

    };

    return (
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')} />
            <StyledText style={styles.titleText}>Crear un Nuevo Alumno</StyledText>

            <StyledText style={styles.text}>Identificador del Aula:</StyledText>
            <StyledTextInput
                placeholder="ID"
                value={id}
                onChangeText={text => setId(text)}
            />

            <StyledText style={styles.text}>Capacidad del Aula:</StyledText>
            <StyledTextInput
                placeholder="Capacidad"
                value={capacidad}
                onChangeText={text => setCapacidad(text)}
            />


            <StyledText style={styles.text}>Selecciona un Profesor:</StyledText>
            <Picker
                style={pickerStyles.picker}
                selectedValue={selectedProfesor}
                onValueChange={(itemValue, itemIndex) => setSelectedProfesor(itemValue)}
            >
                <Picker.Item
                    label="Seleccione profesor"
                    value="" // O cualquier otro valor que desees como un valor nulo
                />
                {profesores.map((profesor) => (
                    <Picker.Item
                        key={profesor.id}
                        label={`${profesor.nombre} ${profesor.apellido1} ${profesor.apellido2}`}
                        value={profesor.id}
                    />
                ))}
            </Picker>

            <Text style={styles.text}>Estudiantes:</Text>
            <StyledMultiSelect
                items={estudiantes.map(estudiante => ({ id: estudiante.id, name: `${estudiante.nombre} ${estudiante.apellido1} ${estudiante.apellido2}` }))}
                uniqueKey="id"
                onSelectedItemsChange={selectedItems => setSelectedEstudiantes(selectedItems)}
                selectedItems={selectedEstudiantes}
                selectText="Selecciona estudiantes"
                searchInputPlaceholderText="Buscar estudiantes..."
                hideSubmitButton
            />



            <View style={styles.button}>
                <Button title="Crear Aula" onPress={handleCreateAula} />
            </View>

            <View style={styles.button}>
                <Button title='Volver al menú de administración' onPress={() => handleButtonClick('/admin')} />
            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    image: {
        width: 600,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    button: {
        width: 200,
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
    text: {
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    }, mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    }, mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    }

})

const pickerStyles = StyleSheet.create({
    picker: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        width: 500,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});



export default CrearAula