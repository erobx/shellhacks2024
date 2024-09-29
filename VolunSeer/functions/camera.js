import * as ImagePicker from 'expo-image-picker';


//Function to get camera permissions so that user may add image to database
//ImagePicker.getCameraPermissionsAsync()
//ImagePicker.launchCameraAsync()

//Function to get gallery permissions so that user may add image to database
//ImagePicker.requestMediaLibraryPermissionsAsync()
//ImagePicker.launchImageLibraryAsync()

// App.js
import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

  const requestPermissions = async () => {
    // Request camera permissions
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.status !== 'granted' || galleryPermission.status !== 'granted') {
      Alert.alert('Permissions required', 'You need to grant camera and gallery permissions to use this feature.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // You can call your upload function here
      // uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const apiUrl = 'YOUR_API_URL_HERE'; // Replace with your API endpoint

    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const jsonResponse = await response.json();
      Alert.alert('Upload Success', `Image uploaded successfully: ${jsonResponse.message}`);
    } catch (error) {
      Alert.alert('Upload Error', 'An error occurred while uploading the image.');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an Image from Gallery" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}