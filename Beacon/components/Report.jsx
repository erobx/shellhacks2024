import { useEffect, useState } from "react";
import { View, Text } from "react-native";

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
      <Text>Upload event</Text>
    </View>
  );
}
