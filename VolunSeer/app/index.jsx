import React from "react";
import { View } from "react-native";
import Map from "../components/Map";

export default function Home() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Map />
    </View>
  );
}
