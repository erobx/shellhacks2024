import { useState, useEffect } from "react";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { get_events_within_radius } from "../functions/queries";

export default function Map() {
  const [region, setRegion] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [markers, setMarkers] = useState([])


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
          console.log(loc.latitude, loc.longitude)
          fetchMarkers(loc.latitude, loc.longitude);
          resolve();
        })
        .catch((error) => {
          console.error('Error in getLocationAsync:', error);
          reject(error);
        });
    });
  }

  const fetchMarkers = async (latitude, longitude) => {
    try {
      const data = await get_events_within_radius(latitude, longitude, 8000);
      console.log('Events:', data);
      setMarkers(data);
    } catch (error) {
      console.error('Error in fetchMarkers:', error);
      setMarkers([]);
    }
  };

  return (
    <>
      {loading ? (
        <Text>Loading...</Text> // Display while loading
      ) : (
        <MapView
          region={region} // Use region instead of initialRegion, to make the map responsive to changes
          loadingEnabled
          showsMyLocationButton
          showsCompass
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: '100%',
          }}
          zoomEnabled
          showsUserLocation
        >
          {/* Display markers */}
          {markers?.length > 0 && markers.map((point, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: 25, longitude: -80 }}
              title={point.title}
              description={point.type} // Assuming 'type' describes the marker
            />
          ))}
        </MapView>
      )}
    </>
  );
}
