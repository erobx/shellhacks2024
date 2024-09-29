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

export const getNearbyEvents = async (lat, lon, radius) => {
  const { data, error } = await supabase
    .rpc("events_within_radius", {
      lat: lat,
      lon: lon,
      radius: radius // in some units
    }).select("location", "type", "id", "name");
  if (error) {
    console.log("Error getting nearby events:", error)
    return null
  }
  return data
}
