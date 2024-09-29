import React from "react";
import { Button, View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Callout } from "react-native-maps";
import { updateEventStatus } from "../functions/queries";

const screenWidth = Dimensions.get("window").width;

const CustomCallout = ({ marker }) => {
  const handleComplete = async () => {
    console.log("Completing event with id:", marker.id);
    await updateEventStatus(marker.id, "Resolved");
  };

  return (
    <Callout tooltip>
      <View>
        <View style={styles.container}>
          <Image
            source={{
              uri: marker.imageUrl,
            }}
            resizeMode="cover"
            style={{ width: 100, height: "100%" }}
          ></Image>
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, flex: 1, height: 150 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {marker.title}
            </Text>
            <Text>{marker.description}</Text>
            <Text>{marker.type}</Text>
            <Text>{marker.address}</Text>
            <Text>{marker.contact}</Text>
            <Button title="Complete" onPress={handleComplete} />
          </View>
        </View>
        <View style={styles.triangle}></View>
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: screenWidth * 0.8,
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  triangle: {
    left: (screenWidth * 0.8) / 2 - 10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 20,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "black",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
});

export default CustomCallout;
