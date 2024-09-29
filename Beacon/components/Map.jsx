import { useState, useEffect } from "react";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getNearbyEvents } from "../functions/queries";

export default function Map() {
  const [region, setRegion] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [markers, setMarkers] = useState([])

  let fetchMarkers = async () => {
    console.log(region.latitude, region.longitude)
    const data = await getNearbyEvents(region.latitude, region.longitude, 5)
    console.log("Events:", data)
    setMarkers(data)
  }

  useEffect(() => {
    onMount();
    fetchMarkers()
  }, [region.latitude, region.longitude])

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
          {markers.map((point, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: point.lat, longitude: point.lon }}
              title={point.title}
              description={point.description}
            />
          ))}
          <Marker
            coordinate={{ latitude: 25.758756416131575, longitude: -80.37411957068102 }}
            title="My test"
            description="something"
          />
        </MapView>
      )}
    </>
  );
}
