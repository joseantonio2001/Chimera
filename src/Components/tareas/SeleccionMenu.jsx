import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { useEffect, useState, useRef} from 'react'
import { DataTable } from 'react-native-paper';
import StyledText from '../StyledText.jsx';
import { useLocation, useNavigate } from 'react-router-native';
import axios from 'axios';


const useHost = (nombre) => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:5050/'+nombre;
    } else {
        return 'http://localhost:5050/'+nombre;
    }
};

const SeleccionMenu = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const lastState = state ? state.lastState : ''; 
    console.log(lastState);
    const usuario = state ? state.estudiante : '';
    const [selectedComida, setSelectedComida] = useState([]);
    const [buttonStyle, setButtonStyle] = useState([styles.pressableButton, styles.pressableButton, styles.pressableButton, styles.pressableButton]);


    const addComida = (comida, id) => {
     const auxComida = [...selectedComida];
     const auxButtonStyle = [...buttonStyle];
     if(auxComida.length === 0){
      auxComida.push(comida);
      // Change the button style
      auxButtonStyle[id] = styles.updatedPressableButton;
    }else{
      if(!auxComida.includes(comida)){
        //Check if comida is 'menu', 'sopa', 'yogur', 'fruta
        if(comida === 'menu' && auxComida.includes('sopa')){
          const index = auxComida.indexOf('sopa');
          auxComida.splice(index, 1);
          auxButtonStyle[1] = styles.pressableButton;
        }
        else if(comida === 'sopa' && auxComida.includes('menu')){
          const index = auxComida.indexOf('menu');
          auxComida.splice(index, 1);
          auxButtonStyle[0] = styles.pressableButton;
        }
        else if(comida === 'yogur' && auxComida.includes('fruta')){
          const index = auxComida.indexOf('fruta');
          auxComida.splice(index, 1);
          auxButtonStyle[3] = styles.pressableButton;
        }
        else if(comida === 'fruta' && auxComida.includes('yogur')){
          const index = auxComida.indexOf('yogur');
          auxComida.splice(index, 1);
          auxButtonStyle[2] = styles.pressableButton;
        }
        auxComida.push(comida);
        auxButtonStyle[id] = styles.updatedPressableButton;
      }
    }
    auxComida.sort();
    setSelectedComida(auxComida);
    setButtonStyle(auxButtonStyle);
  } 

  const submitComida = () => {
    if(!selectedComida.length === 0){
    axios.post(useHost('menus/crearMenu'), {usuario: usuario, selectedComida: selectedComida}).then((response) => {}).catch((error) => {console.log(error)});
    }
    navigate('/tareaComanda/menu', { state: {  aulaId: lastState.idAula, profesorId: lastState.idProfesor, nombreProfesor: lastState.nombreProfesor } });
  }
    
    return(
      <View 
      accessible={true}
      accesibilityRole="grid"
      accessibilityLabel="Sección de selección pedido comanda">
  <StyledText style={styles.headerText}>Comanda</StyledText>
  <Text style={styles.headerText}>Seleccione el pedido</Text>

  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    }}
  >
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Pressable
        style={buttonStyle[0]}
        onPress={() => addComida('menu', 0)}
        accessibilityLabel="Botón Menú"
        accessibilityRole="button"
        accessibilityHint="Botón para seleccionar comida: menú"
      >
        <Image
          source={require('./images/menu.png')}
          style={styles.image}
          alt="Caricatura menú de comida"
        />
      </Pressable>
      <Pressable
        style={buttonStyle[1]}
        onPress={() => addComida('sopa', 1)}
        accessibilityLabel="Botón Sopa"
        accessibilityRole="button"
        accessibilityHint="Botón para seleccionar comida: sopa"
      >
        <Image
          source={require('./images/sopa.png')}
          style={styles.image}
          alt="Caricatura cuenco de sopa"
        />
      </Pressable>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Pressable
        style={buttonStyle[2]}
        onPress={() => addComida('yogur', 2)}
        accessibilityLabel="Botón Yogur"
        accessibilityRole="button"
        accessibilityHint="Botón para seleccionar postre: yogur"
      >
        <Image
          source={require('./images/yogur.png')}
          style={styles.image}
          alt="Caricatura yogur"
        />
      </Pressable>
      <Pressable
        style={buttonStyle[3]}
        onPress={() => addComida('fruta', 3)}
        accessibilityLabel="Botón Fruta"
        accessibilityRole="button"
        accessibilityHint="Botón para seleccionar postre: fruta"
      >
        <Image
          source={require('./images/fruta.png')}
          style={styles.image}
          alt="Caricatura frutas"
        />
      </Pressable>
    </View>
    <Pressable
      style={styles.pressableNormalButton}
      onPress={() => submitComida()}
      accessibilityLabel="Botón Confirmar"
      accesibilityRole="button"
      accesibilityHint="Botón para confirmar pedido y volver atrás"
    >
      <Text style={styles.pressableText}>Confirmar</Text>
    </Pressable>
  </View>
</View>
  );
}

const styles=StyleSheet.create({
    image:{
        width: 200,
        height: 200,
        borderRadius: 4,
        alignSelf: 'center',
        paddingVertical: 10
    },
    pressableButton: {
        width: 200,
        height: 200,
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
	pressableNormalButton: {
        width: 100,
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
    updatedPressableButton:{
		justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 3, // Sombra para un efecto de elevación
        marginBottom: 15,
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'green',
        width: 250,
        height: 250
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',  // Un tono de gris oscuro, puedes ajustarlo según tus preferencias
        marginTop: 50,
        marginBottom: 10,
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
    },
    view:{
        marginTop: 50
    } 
});

export default SeleccionMenu;
