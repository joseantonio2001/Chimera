import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TablasAdmin from './TablasAdmin';
import Tabs from '@mui/material/Tabs';
import { View } from 'react-native';


const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

const PanelAdmin = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newSelectedTab) =>{
    setSelectedTab(newSelectedTab); // Cambia el valor del tab 
  }

    return (
      <View id="Administracion">
      <Box>
      <Tabs 
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}>
        <Tab label="Estudiantes"  aria-label='Gestión estudiantes'/>
        <Tab label="Profesores"  aria-label='Gestión profesores'/>
        <Tab label="Tareas"  aria-label='Gestión tareas'/>
        <Tab label="Clases"  aria-label='Gestión clases'/>
      </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <TablasAdmin nombre='estudiantes'/>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <TablasAdmin nombre='profesores'/>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <TablasAdmin nombre='tareas'/>
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <TablasAdmin nombre='clases'/>
      </TabPanel>
      </View>
    )
  }

export default PanelAdmin;