import { useState, useEffect } from "react";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [region, setRegion] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onMount();
  }, [])

  let onMount = () => {
    getLocationAsync()
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.error("error", error)
        setLoading(false)
      })
  }

  let getLocationAsync = () => {
    return new Promise((resolve, reject) => {
      Location.requestForegroundPermissionsAsync()
        .then(({ status }) => {
          if (status !== 'granted') {
            setErrorMsg("Permissions not granted")
            setRegion(defaultRegion);
            reject('Permissions not granted.');
          } else {
            return Location.getCurrentPositionAsync({});
          }
        })
        .then((location) => {
          const loc = location.coords;
          setRegion({
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.3,
          });
          resolve();
        })
        .catch((error) => {
          console.error('Error in getLocationAsync:', error);
          reject(error);
        });
    });
  }

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <MapView
          ref={(ref) => (mapView = ref)}
          initialRegion={region}
          loadingEnabled
          showsMyLocationButton
          showsCompass
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: "100%",
          }}
          zoomEnabled
          showsUserLocation
        >
          <Marker


          />
        </MapView>
      )}
    </>
  );
}
