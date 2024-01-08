import React from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const UploadFiles = () => {
  const selectAndUpload = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: '*/*'
      });

      const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];

      const myFile = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size
      };

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', file.uri, true);
        xhr.send(null);
      });

      formData.append('file', blob, file.name);

      const { data } = await axios.post('http://localhost:5050/upload', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.log('Error while selecting file: ', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Upload a File</Text>
      <Button title="Select and Upload" onPress={selectAndUpload} />
    </View>
  );
};

export default UploadFiles;
