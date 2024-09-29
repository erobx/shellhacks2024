import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useLocation } from '../hooks/Location';
import { addEvent } from '../functions/queries';

export default function ReportDetails() {
  const { location } = useLocation();
  const route = useRoute();
  const navigation = useNavigation()
  const { imageUri } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const data = await addEvent(title, description, "Unresolved", type, location.latitude, location.longitude)
    console.log("returned:", data)

    Alert.alert('Success', 'Form submitted successfully!');
    goToMap();
  };

  const goToMap = () => {
    navigation.navigate("index");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Selected Image:</Text>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>No image selected.</Text>
        )}

        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Text style={styles.inputLabel}>Incident type</Text>
        <TextInput
          style={styles.input}
          placeholder="Type"
          value={type}
          onChangeText={setType}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
