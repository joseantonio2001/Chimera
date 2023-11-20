import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Main from './src/Components/Main.jsx';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    
    <>
    <StatusBar style='light'/>
    <Main />
    </>
    
  );
}
