import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import ImageViewer from "./ImageViewer";
import Button from "./Button";

const PlaceHolderImage = require('../assets/images/VolunSeer.png')

export default function Report() {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigation = useNavigation()

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  const goToDetails = () => {
    navigation.navigate("ReportDetails", { imageUri: selectedImage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceHolderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button theme="primary" label="Next" onPress={goToDetails} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    bottom: 40,
  },
});
