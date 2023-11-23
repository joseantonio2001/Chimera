import * as DocumentPicker from 'expo-document-picker';
import {useEffect, useState} from "react"
import {View, Text, Button} from "react-native";
import axios from "axios";

const UploadFiles = () => {
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {

      console.log('Estado actual:', selectedDocument);
    }, [selectedDocument]);

    const pickDocument = async () => {
      try {
        const document = await DocumentPicker.getDocumentAsync({
          type: '*/*',
          copyToCacheDirectory: true,
        });
        console.log('Documento seleccionado:', document);

        if (document) {
          console.log('Document:', document);
          setSelectedDocument(document.assets[0]);
          console.log('SelectedDocument:', selectedDocument);
        } else {
          setSelectedDocument(null);
        }
      } catch (error) {
        console.error('Error seleccionando documento:', error);
      }
    };

    const uploadToBackend = async () => {
      console.log('SelectedDocument:', selectedDocument);
      if (selectedDocument) {
        console.log('SelectedDocument uri: ' + selectedDocument.uri);
        try {
          const formData = new FormData();
          const file = {
            uri: selectedDocument.uri,
            name: selectedDocument.name,
            type: selectedDocument.type,
          };

          // Create a new Blob object from the file data
          console.log(file.uri);
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.onerror = function() {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', file.uri, true);
            xhr.send(null);
          });

          // Append the Blob object to the FormData
          formData.append('file', blob, file.name);

          console.log('FormData:', formData);

          const response = await axios.post('http://localhost:5050/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Respuesta del backend:', response.data);
        } catch (error) {
          console.error('Error al enviar el archivo al backend:', error);
        }
      } else {
        console.log('Por favor, selecciona un archivo primero');
      }
    };

    return (
    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Button title="Seleccionar documento" onPress={pickDocument} />
      {selectedDocument && (
        <View style={{ marginTop: 20 }}>
          <Text>Nombre: {selectedDocument.name}</Text>
          <Text>Tipo: {selectedDocument.type}</Text>
          <Text>Tamaño: {selectedDocument.size / 1024} KB</Text>
            <Button title="Subir documento" onPress={uploadToBackend} />
        </View>
      )}
    </View>
  );
};

export default UploadFiles;
