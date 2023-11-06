import React, { useState } from 'react'
import { Text, Picker, View, Button, StyleSheet, Image } from 'react-native'
import { useNavigate } from 'react-router-native';
import StyledText from './StyledText';
import axios from 'axios';
import StyledTextInput from './StyledTextInput';
import StyledMultiSelect from './StyledMultiSelect';



const CrearAula = () => {
    const navigate = useNavigate();

    const handleButtonClick = (enlace) => {

        navigate(enlace);
    };

    const [id, setId] = useState('');
    const [capacidad, setCapacidad] = useState('');

    //IMPLEMENTACIONNNNNNNN
    const [selectedEstudiantes, setSelectedEstudiantes] = useState([]);
    //IMPLEMENTACIONNNNNNNN
    const [selectedProfesor, setSelectedProfesor] = useState('');
    //IMPLEMENTACIONNNNNNNN

    const handleCreateAula = () => {
        //IMPLEMENTACIONNNNNNNN
        const estudiantesSeleccionados = selectedEstudiantes.map(estudiante => estudiante.id);
        //IMPLEMENTACIONNNNNNNN
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post('http://localhost:5050/api/crearAula', {
            id,
            capacidad,
            //IMPLEMENTACIONNNNNNNN
            //selectedProfesor,
            //estudiantesSeleccionados
            //IMPLEMENTACIONNNNNNNN
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

    //IMPLEMENTACIONNNNNNNN
    const estudiantesData = [
        { id: '1', name: 'Estudiante 1' },
        { id: '2', name: 'Estudiante 2' },
        // Agrega más estudiantes según sea necesario
    ];
    //IMPLEMENTACIONNNNNNNN

    //IMPLEMENTACIONNNNNNNN
    const profesoresData = [
        { id: '1', name: 'Profesor 1' },
        { id: '2', name: 'Profesor 2' },
        // Agrega más profesores según sea necesario
    ];
    //IMPLEMENTACIONNNNNNNN

    return (
        <View>
            <Image style={styles.image} source={require('../../data/img/LogoColegio.png')} />
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
                {profesoresData.map((profesor) => (
                    <Picker.Item key={profesor.id} label={profesor.name} value={profesor.id} />
                ))}
            </Picker>



            <Text style={styles.text}>Estudiantes:</Text>
            <StyledMultiSelect
                items={estudiantesData}
                uniqueKey="id"
                onSelectedItemsChange={selectedItems => setSelectedEstudiantes(selectedItems)}
                selectedItems={selectedEstudiantes}
                selectText="Selecciona estudiantes"
                searchInputPlaceholderText="Buscar estudiantes..."
                displayKey="name"
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