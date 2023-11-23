import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import StyledText from '../StyledText';
import StyledMultiSelect from '../StyledMultiSelect';
import MultiSelect from 'react-native-multiple-select';
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

const CrearTarea = ()=>{

    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        navigate(enlace);
    };

    const [selectedTipo, setSelectedTipo] = useState([]);
    // const [addedTipo, setAddedTipo] = useState([]);

    const opciones = [
        { name: 'Normal', id: '0' }, 
        { name: 'Comanda', id: '1' }, 
        { name: 'Pedido de material', id: '2' }, 
    ];

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [numPaso, setNumPaso] = useState(1);
    const [portada, setPortada] = useState('');
    
    const handleCreateTarea = () => {
        // Realiza una solicitud POST al servidor backend para crear una tarea
        axios.post(`${useHost()}/crearTarea`, {
            nombre,
            descripcion,
            tipo
            // portada
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/confirmaciones', { state: { mensaje: '¡Tarea creada con éxito!' } });
        })
        .catch((error) => {
            // Maneja los errores
            console.error("Error al crear tarea: ",error);
            navigate('/confirmaciones', { state: { mensaje: 'Error en la creación de la tarea', error } });
        });
    };



    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            
            <StyledText style={styles.headerText}>CREAR NUEVA TAREA</StyledText>
            
            {/* Nombre */}
            <StyledTextInput
                label="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />

            {/* Tipo */}
            <StyledMultiSelect 
                // style = {styles.select}
                items={opciones}
                uniqueKey="id"
                canAddItems={false}
                hasSelectAll={false}                // deshabilita la opción "Seleccionar todo"
                single={true}                       // habilita la selección única            
                selectText="Tipo de tarea"
                searchInputPlaceholderText="Buscar..."
                onSelectedItemsChange={selectedItems => setSelectedTipo(selectedItems)}
                selectedItems={selectedTipo}
                
                // IMPLEMENTAR EL PODER AÑADIR ALGUN 'TIPO' DE TAREA 
                // canAddItems={true}
                // onAddItem={addedItems => setAddedTipo(addedItems)}

                hideSubmitButton
            />
            <View>
            {/* selectedTipo.map((numero) => (
                // <Text key={numero}>{numero}</Text>
            )) */ }
            </View>
            {/* Descripción */}
            <StyledTextInput
                label="Descripcion"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />

            <StyledText style={styles.text}>Pasos de la tarea:</StyledText>
            
            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/crearpaso')}>
                    <Text style={styles.pressableText}>Añadir Paso</Text>
                </Pressable> 
            </View>
            
            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleCreateTarea}>
                    <Text style={styles.pressableText}>Crear Tarea</Text>
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
    select: {
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#999',
        // borderWidth: 1,
        // borderTopWidth: 0.2, // Elimina el borde superior
        // borderBottomWidth: 0.2, // Elimina el borde inferior
        // borderLeftWidth: 0.2, // Aplica borde en el lado izquierdo
        // borderRightWidth: 0.2, // Aplica borde en el lado derecho
    },
    error: {
        borderColor: 'red',
    },
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
    },
    mensajeExito: {
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

export default CrearTarea