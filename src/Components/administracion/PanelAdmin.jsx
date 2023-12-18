import {  Dimensions , View} from 'react-native';
import { SceneMap,TabView } from 'react-native-tab-view';
import TablaClase from './tablas/TablaClase';
import TablaEstudiante from './tablas/TablaEstudiante';
import TablaProfesores from './tablas/TablaProfesor';
import TablaTarea from './tablas/TablaTarea';
import TablaInventario from './tablas/TablaInventario';
import {useState}from 'react';


const tabEstudiantes = () => (
  <View>
    <TablaEstudiante/>
  </View>
);

const tabProfesores = () => (
  <View>
    <TablaProfesores/>
  </View>
);

const tabTareas = () => (
  <View>
    <TablaTarea/>
  </View>
);

const tabClases = () => (
  <View>
    <TablaClase/>
  </View>
);

const tabInventario = () => (
  <View>
    <TablaInventario />
  </View>
);

const renderScene = SceneMap({
  first: tabEstudiantes,
  second: tabProfesores,
  third: tabTareas,
  fourth: tabClases,
  fifth: tabInventario
});

const initialLayout = { width: Dimensions.get('window').width };

const PanelAdmin = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Estudiantes' },
    { key: 'second', title: 'Profesores' },
    { key: 'third', title: 'Tareas' },
    { key: 'fourth', title: 'Clases' },
    { key: 'fifth', title: 'Inventario' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default PanelAdmin;
