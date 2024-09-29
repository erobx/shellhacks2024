import supabase from "./supabaseClient";

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select()
  if (error) return null
  return data;
}

export const getEvents = async () => {
  const { data, error } = await supabase.from("events").select()
  if (error) return null
  return data;
}

// Attempt to retrieve events given user location and radius (in meters)
export const get_events_within_radius = async (lng, lat, radius) => {
  try {
    const { data, error } = await supabase.rpc('events_within_radius', {
      input_lat: parseFloat(lat),
      input_lng: parseFloat(lng),
      radius: parseFloat(radius),
    });

    if (error) {
      throw error;
    }
    return data;

  } catch (error) {
    console.error("Error fetching events in radius: ", error)
    return []
  }
}
