import React from "react";
import { View } from "react-native";
import {useAuth0, Auth0Provider} from 'react-native-auth0';


import Map from "../components/Map";

export default function Home() {
  const { authorize, clearSession, user, error } = useAuth0();

  useEffect(() => {
    if (error) {
      Alert.alert('Authentication Error', error.message);
    }
  }, [error]);

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.error(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <Map />
            <Button title="Logout" onPress={onLogout} />
          </>
        ) : (
          <Button title="Login" onPress={onLogin} />
        )}
      </View>
    </Auth0Provider>
  );
}
