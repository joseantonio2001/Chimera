import { FAB, IconButton } from 'react-native-paper';
import { FlatList, Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-native';
import StyledMultiSelect from '../StyledMultiSelect';
import StyledText from '../StyledText';
import StyledTextInput from '../StyledTextInput';
import axios from 'axios';

const useHost = (campo) => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050/'+campo;
    } else {
      return 'http://localhost:5050/'+campo;
    }
};



const EditarAlumno = ()=>{
    const navigate = useNavigate();
    
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };  

const { state } = useLocation();
const tareaId = state ? state.id : '';
const [nombre, setNombre] = useState('');
const [tipo, setTipo] = useState(0);
const [descripcion, setDesc] = useState("");
const [portada, setPortada] = useState(null);
const [video, setVideo] = useState(null);
const [pasos, setPasos] = useState([]);

const getTareaPasos = () => {   
    // Obtener información de tareas por ID
    axios.get(`${useHost('tareas')}/${tareaId}`)
        .then((response) => {
       setNombre(response.data[0][0].nombre);
       setTipo(response.data[0][0].tipo);
       setDesc(response.data[0][0].descripcion ?? "");
       setPortada(response.data[0][0].portada);
       setVideo(response.data[0][0].video);
    })
        .catch((error) => {
        console.error('Error al obtener información de las tarea:', error);
      });
  
    // Obtener información de pasos por tareaId
    axios.get(`${useHost('pasosTarea')}/${tareaId}`)
      .then((response) => {
        setPasos(response.data[0]);
      })
      .catch((error) => {
        console.error('Error al obtener información de la pasos por tarea:', error);
      });
}

useEffect(() => {
    getTareaPasos();
}, [tareaId]);


    const handleEditTarea = () => {

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

    const handleEditPaso = (ide) => {
        navigate('/admin/tareas/editarpaso', { state: {id: ide}});
    };

    const handleDeletePaso= (ide) => {
        axios.delete(`${useHost('pasos/borrarPaso/')}+${ide}`)
        .then((response) => {
            navigate('/admin/editartarea', { state: { id: tareaId }});
            })
            .catch((error) => console.error('Error al eliminar:', error));
    };

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: `${useHost(item.imagen)}` }} style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
            <Text>{item.descripcion}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IconButton icon="pencil" onPress={() => handleEditPaso(item.id)} />
            
            <IconButton icon="delete" onPress={() => handleDeletePaso(item.id)} />
          </View>
        </View>
    );

    return(
        <View>
            <Image style={styles.image} source={require('../../../data/img/LogoColegio.png')}/>
            <StyledText style={styles.titleText}>Modificar tarea</StyledText>
            <StyledText style={styles.text}>Identificador de tarea: {tareaId} </StyledText>
            <StyledText style={styles.text}>Nombre</StyledText>
            <StyledTextInput
            label="Nombre"
            value={nombre}
            onChangeText={text => setNombre(text)}
            />
            <StyledTextInput
            label="Descripción"
            value={descripcion}
            onChangeText={text => setDesc(text)}
            />
            <StyledTextInput
            label="Tipo"
            value={tipo}
            onChangeText={text => setTipo(parseInt(text))}
            />
            <View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#ddd', overflow: 'hidden' }}>
            <FlatList
            data={pasos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
            </View>
            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleEditTarea} >
                    <Text style={styles.pressableText}>Editar tarea</Text>
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