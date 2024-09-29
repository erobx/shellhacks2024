import React from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Callout } from "react-native-maps";

const screenWidth = Dimensions.get("window").width;

const CustomCallout = ({ marker }) => {
  const markerImages = {
    'Downed Tree': require('../assets/images/markers/downed_tree.png'),
    'Request Supplies': require('../assets/images/markers/request_supplies.png'),
    'Request Shelter': require('../assets/images/markers/request_shelter.png'),
    'Power Line': require('../assets/images/markers/power_lines.png'),
    'Traffic Light': require('../assets/images/markers/traffic_light.png'),
    'Flooding': require('../assets/images/markers/flooding.png'),
    'Request Ride': require('../assets/images/markers/need_ride.png'),
    'Debris Cleanup': require('../assets/images/markers/debris_cleanup.png'),
    'Provide Supplies': require('../assets/images/markers/provide_supplies.png'),
    'Provide Shelter': require('../assets/images/markers/provide_shelter.png'),
    'Misc': require('../assets/images/markers/misc.png'),
  };
  return (
    <View>
        <Image source={markerImages[marker.type]} style={{ width: 60, height: 60, resizeMode: "contain"}} />
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
            </View>
          </View>
          <View style={styles.triangle}></View>
        </View>
      </Callout>
    </View>

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
