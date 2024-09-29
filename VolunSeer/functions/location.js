const gmaps_key = process.env.GOOGLE_MAPS_API_KEY

// Function to get address from latitude and longitude using Google Maps API
async function getAddressFromCoordinates(lat, lon) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${gmaps_key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      // Extract the formatted address from the API response
      const address = data.results[0].formatted_address;
      return address;
    } else {
      throw new Error(`Geocoding API failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
}

function getBoundingBox(lat, lon, range) {
  /*
  * lat: Latitude in degrees
  * lon: Longitude in degrees
  * range: The range in kilometers 
  * Returns: An object containing the coordinates of the bounding box
  */

  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert range from kilometers to degrees
  const rangeInDegrees = range / earthRadius;

  // Calculate the bounding box
  const minLat = lat - rangeInDegrees * (180 / Math.PI);
  const maxLat = lat + rangeInDegrees * (180 / Math.PI);
  const minLon = lon - rangeInDegrees * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);
  const maxLon = lon + rangeInDegrees * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

  return {
    minLat,
    maxLat,
    minLon,
    maxLon
  };
}

// Function to convert miles to kilometers
function milesToKm(miles) {
  const km = miles * 1.60934;
  return km;
}

// Function to convert kilometers to miles
function kmToMiles(km) {
  const miles = km / 1.60934;
  return miles;
}

// Example usage
/*
(async () => {
    try {
        console.log(gmaps_key);
        const address = await getAddressFromCoordinates(37.7749, -122.4194);
        console.log(address);
    } catch (error) {
        console.error(error);
    }
}
*/
