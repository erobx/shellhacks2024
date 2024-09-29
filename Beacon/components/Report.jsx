import { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const PlaceHolderImage = require('../assets/images/VolunSeer.png')

export default function Report() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  }, [])

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Image source={PlaceHolderImage} style={styles.image} />
      <Text>Upload event</Text>
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
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
