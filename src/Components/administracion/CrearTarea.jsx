import {  Dimensions, Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import StyledText from '../StyledText';
import StyledMultiSelect from '../StyledMultiSelect';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-native';
import {useState, useEffect} from 'react'
import TablaPaso from './tablas/TablaPaso';
import { SceneMap,TabView } from 'react-native-tab-view';

// SIMULADOR EN WEB Y ANDROID
const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/tareas';
    } else {
      return 'http://localhost:5050/tareas';
    }
};

const CrearTarea = ()=>{

    // NAVEGACIÓN
    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        navigate(enlace);
    };
    const { state } = useLocation();
    const mensajeTarea = state ? state.mensajeTarea : '';
    const hayTarea = state ? state.hayTarea : 0; // tarea q viene de CrearPasos
    const nuevaTarea = state ? state.nuevaTarea : 0; // tarea q viene de TablaTarea

    const [id, setId] = useState(-1);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [selectedTipo, setSelectedTipo] = useState([]);
    const [datosGuardados, setDatosGuardados] = useState(false); // tarea medio guardada

    const [numPaso, setNumPaso] = useState(1);
    const [portada, setPortada] = useState('');
    const [video, setVideo] = useState('');


    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Pasos de la tarea' },
    ]);

    useEffect(() => {
        getDatosTarea();
    }, [])

    useEffect(() => { // Se guarda bien el id, lo imprime por consola al conseguirlo en getIdTarea
        console.log('ID de la tarea:', id)
    }, [id])

    useEffect(() => {
        console.log('Navegación desde crearPaso, ID de la tarea: ', hayTarea);
    }, [hayTarea])

    useEffect(() => {
        console.log('Navegación desde tablaTareas, ID de la tarea: ', nuevaTarea);
    }, [nuevaTarea])

    useEffect(() => {
        console.log('Actualizando selectedTipo: ', selectedTipo);
    }, [selectedTipo])
    
    // SELECTOR PARA TIPO DE TAREA
    const opciones = [
        { name: 'Normal', id: '1' }, 
        { name: 'Comanda', id: '2' }, 
        { name: 'Pedido de material', id: '3' }, 
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
          <TablaPaso idTarea={id.toString()} paso={numPaso.toString()}/>
        </View>
    );
    
    const renderScene = SceneMap({
        first: tabPasos,
    });

     // CONEXIÓN BD PARA GUARDAR TAREA
     const handleGuardarTarea = () => {
        if (!nombre || !selectedTipo[0] || !descripcion){
            navigate('/confirmaciones', { state: { mensaje: 'Es necesario introducir el nombre, tipo y descripcion de la tarea', 
            ruta : '/admin/creartarea', mensajeBoton : 'Volver a la tarea'} });
            return;
        }
        if (id !== -1){
            actualizarTarea();
            return;
        }
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post(`${useHost()}/crearTarea`, {
            nombre,
            descripcion,
            video,
            portada,
            tipo : parseInt(selectedTipo[0])
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            getIdTarea();
            setDatosGuardados(true);
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmaciones', { state: { mensaje: 'Error al guardar los datos de la tarea.', error } });
        });
    };

    // Actualizar tarea
    const actualizarTarea = () => {
        axios.put(`${useHost()}/actualizarTarea`, {
            id,
            nombre,
            descripcion,
            video,
            portada,
            tipo : parseInt(selectedTipo[0])
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            console.log('Cambios actualizados')
        })
        .catch((error) => {
            // Maneja los errores
            navigate('/confirmaciones', { state: { mensaje: 'Error al guardar los cambios de la tarea.', error } });
        });
    }

    // ID de la tarea una vez guardada
    const getIdTarea = async () => {
        console.log('getIdTarea');
    
        try {
            const response = await axios.get(`${useHost()}/tareaMayorId`);
            const resultado = response.data;
    
            // Verificar si el resultado contiene el campo 'id'
            if (resultado && resultado.id) {
                console.log('Id Tarea:', resultado.id);
    
                // Actualizar el estado y esperar a que se complete antes de continuar
                await setId(resultado.id);
    
                // Log después de la actualización del estado
                console.log('El valor actualizado del id es ', id);
            } else {
                console.error('La respuesta de la API no contiene un campo "id" válido:', resultado);
            }
        } catch (error) {
            // Manejar los errores
            console.error('Error en la solicitud GET del ID', error);
        }
    };
    

    // Datos de la tarea traidos por ID
    const getDatosTarea = () => {
        if (hayTarea !== 0){
        axios.get(`${useHost()}/${hayTarea}`)
            .then((response) => {
                const resultado = response.data[0];
                if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
                    resultado.forEach((tarea) => {
                        setNombre(tarea.nombre);
                        setDescripcion(tarea.descripcion);
                        const selector = [...selectedTipo, tarea.tipo]
                        setSelectedTipo(selector);
                    });
                }
                setDatosGuardados(true);
                return true;
            })
            .catch((error) => {
                // Manejar los errores
                console.error('Error en la solicitud GET de los datos:', error);
                return false;
            });

        }
    };

    const encontrarClavePorValor = (opciones, valorBuscado) => {
        for (const opcion of opciones) {
          if (parseInt(opcion.id) === valorBuscado) {
            return opcion.name;
          }
        }
        return null;
    };

    return( 
            <View>
                <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
                <View>       
                        <StyledText style={styles.headerText}>NUEVA TAREA</StyledText>

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
                            uniqueKey="id" // CAMBIAR POR name PERO permitir en la bbdd que tipo de tarea sea str 
                            canAddItems={false}
                            hasSelectAll={false}                // deshabilita la opción "Seleccionar todo"
                            single={true}                       // habilita la selección única            
                            selectText={selectedTipo.length > 0 ? encontrarClavePorValor(opciones, selectedTipo[0]) : "Tipo de tarea"}
                            searchInputPlaceholderText="Buscar..."
                            onSelectedItemsChange={selectedItems => setSelectedTipo(selectedItems)}
                            selectedItems={selectedTipo}
                            hideSubmitButton
                        />
                        <StyledTextInput
                            style={styles.textInput}
                            label="Descripcion"
                            value={descripcion}
                            onChangeText={text => setDescripcion(text)}
                        />

                        { !datosGuardados && (
                            <Pressable style={[styles.pressableButton, { width: 400 }]} onPress={handleGuardarTarea}>
                                <Text style={styles.pressableText}>Guardar cambios para añadir pasos</Text>
                            </Pressable> 
                        )}
                        
                        { datosGuardados && (
                            <Pressable style={[styles.pressableButton, { width: 400 }]} onPress={handleGuardarTarea}>
                                <Text style={styles.pressableText}>Actualizar cambios</Text>
                            </Pressable> 
                        )}
                        { datosGuardados && (
                            <TabView
                                style={styles.tab} 
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                            />
                        )}
                        
                        <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/admin')}>
                            <Text style={styles.pressableText}>Volver al inicio</Text>
                        </Pressable>   
                    </View>
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
        marginBottom: 0,
        marginTop: 20,
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