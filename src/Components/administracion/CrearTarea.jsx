import {  Dimensions, Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import StyledText from '../StyledText';
import StyledMultiSelect from '../StyledMultiSelect';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import {useState} from 'react'
import TablaPaso from './tablas/TablaPaso';
import { SceneMap,TabView } from 'react-native-tab-view';


// SIMULADOR EN WEB Y ANDROID
const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/estudiantes';
    } else {
      return 'http://localhost:5050/estudiantes';
    }
};

const CrearTarea = ()=>{

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numPaso, setNumPaso] = useState(1);
    const [portada, setPortada] = useState('');
    const [selectedTipo, setSelectedTipo] = useState([]);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Pasos de la tarea' },
    ]);

    // NAVEGACIÓN
    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        navigate(enlace);
    };

    // SELECTOR PARA TIPO DE TAREA
    const opciones = [
        { name: 'Normal', id: '0' }, 
        { name: 'Comanda', id: '1' }, 
        { name: 'Pedido de material', id: '2' }, 
    ];

    // PROPIEDADES PARA TABLA
    const initialLayout = { 
        marginBottom: 10,
        // width: 100,
        height: 200,
        color: '#333', 
     };

    // TABLA PASOS
    const tabPasos = () => (
        <View>
          <TablaPaso/>
        </View>
    );
    
    const renderScene = SceneMap({
        first: tabPasos,
    });
    
     // CONEXIÓN BD PARA CREAR TAREA
    const handleCreateTarea = () => {
        // Realiza una solicitud POST al servidor backend para crear una tarea
        axios.post(`${useHost()}/crearTarea`, {
            nombre,
            descripcion,
            selectedTipo
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
                style={styles.textInput}
                label="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />

            {/* Tipo */}
            <StyledMultiSelect
                style={[styles.StyledMultiSelect, {width: 700}]}
                items={opciones}
                uniqueKey="id"
                canAddItems={false}
                hasSelectAll={false}                // deshabilita la opción "Seleccionar todo"
                single={true}                       // habilita la selección única            
                selectText="Tipo de tarea"
                searchInputPlaceholderText="Buscar..."
                onSelectedItemsChange={selectedItems => setSelectedTipo(selectedItems)}
                selectedItems={selectedTipo}
                hideSubmitButton
            />

            {/* Descripción */}
            <StyledTextInput
                style={styles.textInput}
                label="Descripcion"
                value={descripcion}
                onChangeText={text => setDescripcion(text)}
            />

            <TabView
                style={styles.tab} 
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
            
            <Pressable style={styles.pressableButton} onPress={handleCreateTarea}>
                <Text style={styles.pressableText}>Crear Tarea</Text>
            </Pressable> 

            <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
                <Text style={styles.pressableText}>Volver atrás</Text>
            </Pressable>  

        </View>
        
    )
}

const styles=StyleSheet.create({
    tab: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 30,
        width: 700,
        justifyContent: 'center',
        alignSelf: 'center',  
        borderColor: '#999',
        backgroundColor: '#EAF2F8',
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
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        width: 700,
        justifyContent: 'center',
        alignSelf: 'center',   
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
        // marginTop: 10,
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