  import {Image, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
  import { useEffect, useState} from 'react'
  import { useLocation, useNavigate } from 'react-router-native';
  import { Picker } from '@react-native-picker/picker';
  import StyledMultiSelect from './StyledMultiSelect';
  import StyledText from './StyledText';
  import axios from 'axios';




  const useHost = () => {
    if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5050';
    } else {
    return 'http://localhost:5050';
    }
  };


  const PedirMaterial = () => {

    const navigate = useNavigate();

    const {state} = useLocation();
    const claseId = state ? state.id : '';
    const [inventario, setInventario] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState([]);
    const [selectedCantidad, setSelectedCantidad] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedEstudiante, setSelectedEstudiante] = useState([]);
    const [quantities, setQuantities] = useState({});

    const [idTarea, setId] = useState(-1);
    const [nombreTarea, setNombre] = useState('');
    const [descripcionTarea, setDescripcion] = useState('');
    const [tipoTarea, setTipo] = useState([]);


    const handleCantidadChange = (text, itemId) => {
      // Verificar si la cantidad introducida es mayor a la disponible
      const cantidadDisponible = inventario.find(item => item.id === itemId)?.cantidad || 0;
      const cantidadIntroducida = parseInt(text, 10) || 0;
    
      if (cantidadIntroducida > cantidadDisponible) {
        // Mostrar un mensaje de error o realizar la acción correspondiente
        console.log(`Cantidad introducida mayor a la disponible para ${itemId}`);
        // También puedes manejar el estado para mostrar el error en la interfaz de usuario
      } else {
        // Actualizar el estado de cantidades
        setQuantities((prevQuantities) => {
          const newQuantities = {
            ...prevQuantities,
            [itemId]: text,
          };
          setSelectedCantidad(Object.values(newQuantities)); // Actualizar selectedCantidad con los nuevos valores
          return newQuantities;
        });
      }
    };

    const handleButtonClick = (enlace) => {
      navigate(enlace);
    };

    const handlePedirMaterial = async () => {
      try {
        // Crear la tarea del material
        const tareaResponse = await axios.post(`${useHost()}/tareas/crearTarea`, {
          nombre: nombreTarea,
          descripcion: descripcionTarea,
          tipo: tipoTarea,
        });
    
        // Obtener el id de la tarea creada
        const idTarea = await getIdTarea();

    
        // Asignar la tarea al estudiante indicado
        await axios.post(`${useHost()}/tareas/aniadeasignaciones`, {
          idAlumno: selectedEstudiante,
          tareas: idTarea,
        });
    
        
          // Filtrar los elementos con cantidades seleccionadas
          const elementosSeleccionados = inventario.filter((item) => quantities[item.id] > 0);
              
          // Obtener los materiales y cantidades seleccionados
          const materialesSeleccionados = elementosSeleccionados.map((item) => ({
            ...item,
            cantidad: quantities[item.id],
          }));

          // Guardar en el estado
          setSelectedMaterial(materialesSeleccionados);
          setSelectedCantidad(Object.values(quantities));

        // Hacer la llamada al backend para guardar los pedidos
        await axios.post(`${useHost()}/guardarPedido`, {
          claseId,
          alumnoId: selectedEstudiante,
          pedidos: materialesSeleccionados.map((item, index) => ({
            inventarioId: item.id,
            cantidad: selectedCantidad[index],
          })),
        });

        navigate('/confirmaciones', { state: { mensaje: 'Se ha hecho correctamente el pedido del material' } });
    
      } catch (error) {
        console.error('Error al procesar el pedido de material:', error);
      }
    };

    const getIdTarea = async () => {
      try {
        const response = await axios.get(`${useHost()}/tareas`);
        const resultado = response.data[0];
        if (resultado && resultado.length > 0 && Array.isArray(resultado)) {
          const tarea = resultado.find(t => t.nombre === nombreTarea && t.descripcion === descripcionTarea && t.tipo === tipoTarea);
          if (tarea) {
            setId(tarea.id);
            return tarea.id; // Devuelve el id de la tarea
          } else {
            throw new Error('Tarea no encontrada');
          }
        } else {
          throw new Error('Tarea no encontrada');
        }
      } catch (error) {
        console.error('Error en la solicitud GET del ID', error);
        throw error;
      }
    };

    useEffect(() => {
      const obtenerInventario = async () =>{
        try {
          const response = await axios.get(`${useHost()}/inventario`);
          const resultado = response.data[0];
          console.log(resultado);
          setInventario(resultado);
      } catch (error){
          console.error('Error al obtener el inventario del almacen:', error);
        }
      }

      const obtenerAlumnos = async () =>{
        try{
          const response = await axios.get(`${useHost()}/estudiantes`);
          const resultado = response.data[0];
          console.log(resultado);
          setEstudiantes(resultado);
        } catch (error){
          console.error('Error al obtener la lista de alumnos:', error);
        }
      }

      obtenerInventario();
      obtenerAlumnos();

      setNombre(`Pedido de material`);
      setDescripcion(`Se necesita material en la clase`);
      setTipo(3);
      
    }, [claseId]);

    return(

      <View>
        <Image style={styles.image} source={require('../../data/img/LogoColegio.png')}/>

          <Text style={styles.text}>Selecciona la cantidad deseada de cada material:</Text>

        <View style={styles.container}>

        {inventario.map(elemento => (
          <View key={elemento.id}>
            <View style = {styles.itemWrapper}>
              <Text style={[styles.blackText, styles.articleName, styles.itemContainer]}>{elemento.nombre}</Text>
              <Text style={[styles.blackText, styles.itemContainer]}>Cantidad maxima: {elemento.cantidad}</Text>
              <TextInput
                style={[styles.grayText, styles.inputQuantity, styles.itemContainer]}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={quantities[elemento.id] ? quantities[elemento.id].toString() : ''}
                onChangeText={text => handleCantidadChange(text, elemento.id)}
                editable={true}
              />
            </View>
          </View>
        ))}
        </View>

        
        <Picker
                  style={pickerStyles.picker}
                  selectedValue={selectedEstudiante}
                  onValueChange={(itemValue, itemIndex) => setSelectedEstudiante(itemValue)}
              >
              <Picker.Item label="Seleccione un estudiante" value={-1} />
                  {estudiantes.map((alumno) => (
                      <Picker.Item
                          key={alumno.id}
                          label={`${alumno.nombre} ${alumno.apellido1} ${alumno.apellido2}`}
                          value={alumno.id}
                      />
                  ))}
              </Picker>



  <View style={styles.button}>
                  <Pressable style={styles.pressableButton} onPress={handlePedirMaterial}>
                      <Text style={styles.pressableText}>Pedir el material</Text>
                  </Pressable> 
              </View>
              
          <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/profesor')}>
            <Text style={styles.pressableText}>Volver a inicio</Text>
          </Pressable>
      </View>


    )

  };

      
  const styles=StyleSheet.create({
      image:{
          width: 600,
          height: 200,
          borderRadius: 4,
          alignSelf: 'center',
          paddingVertical: 10
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
      welcomeText: {
          fontSize: 18,
          textAlign: 'left',
          color: '#333',
          marginLeft: 10,
          marginBottom: 10,
        },
      pressableText: {
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold', // Texto en negrita
          textAlign: 'center',
      },    

      imagesContainer: {
          flexDirection: 'row', // Hace que los elementos hijos se coloquen en una fila
          justifyContent: 'space-around', // Espaciado uniforme entre los elementos hijos
          alignItems: 'center', // Centra los elementos verticalmente
          marginTop: 20,
        },
      
        imageContainer: {
          alignItems: 'center',
        },
      
        imageTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 5, // Ajustar según tus necesidades
        },
        largeImage: {
          width: 150, // Ajustar según tus necesidades
          height: 150, // Ajustar según tus necesidades
          borderRadius: 4,
          marginBottom: 10,
        },

        text: {
          justifyContent: 'center', // Centra horizontalmente
          textAlign: 'center', 
          fontSize: 20,
          fontWeight: '700',
          marginTop: 20,
          marginBottom: 20,
          color: 'black'
      },

      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },

      headerTextTable: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      blackText: {
        color: 'black',
      },
      grayText: {
        color: 'gray',
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 16,
      },
      articleName: {
        fontSize: 20,
      },
      inputQuantity: {
        fontSize: 16,
        width: 100,
        textAlign: 'center',
      },
      itemWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black', // Puedes ajustar el color del borde según tus preferencias
        padding: 10,
        borderRadius: 8,
        width: 300, // Ajusta el ancho del wrapper según tus necesidades
      },
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



  export default PedirMaterial