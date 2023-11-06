import { Row, Rows, Table } from 'react-native-table-component';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const rol = {
  1: 'Admin',
  0: 'Profesor',
  2: 'Estudiante'
};

const preferencias = {
  100: 'Texto',
  '010': 'Video',
  '001': 'Pictoramas',
  110: 'Texto y video',
  101: 'Texto y pictoramas',
  '011': 'Video y pictoramas',
  111: 'Texto, video y pictoramas'
};

const ListaUsuarios = () => {
  const [tableData, setTableData] = useState([]);
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/getUsuarios');
      fixTableData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    }
  };

  const fixTableData = (data) => {
    const tableData = [];
    for (const user of data) {
      if (user.admin === null) {
        user.admin = rol['2'];
      } else {
        user.admin = rol[user.admin];
      }

      if (user.preferencias === null) {
        user.preferencias = preferencias['100'];
      } else {
        user.preferencias = preferencias[user.preferencias];
      }
      tableData.push(user);
    }
    setTableData(tableData);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const tableHeading = ['Nombre', 'Primer apellido', 'Segundo apellido', 'Rol', 'Preferencias', '', ''];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row data={tableHeading} style={styles.head} textStyle={styles.text} />
        <Rows
          data={tableData.map((user, index) => [
            user.nombre,
            user.apellido1,
            user.apellido2,
            user.admin,
            user.preferencias,
            <TouchableOpacity style={styles.btn} onPress={() => console.log('Se borrará: ' + index)}>
              <Text style={styles.btnText}>Borrar</Text>
            </TouchableOpacity>,
            <TouchableOpacity style={styles.btn} onPress={() => console.log('Se editará: ' + index)}>
              <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
          ])}
          textStyle={styles.text}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 900, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: {
    marginTop: 6,
    marginBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: { marginLeft: 10, marginRight: 6, width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default ListaUsuarios;
