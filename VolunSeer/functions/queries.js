import supabase from "./supabaseClient";
import * as location from "./location";

// All data from a single user
export const getUser = async (userId) => {
  const { user, error } = await supabase.from("users").select("*").eq("id", userId).single()
  if (error) { return null }
  return user
}

// Need user events
export const getUserEvents = async (userId) => {
  const { events, error } = await supabase
    .from("events")
    .select("*").eq("user_id", userId)
  if (error) {
    console.log("Error returning events:", error)
    return []
  }
  return events
}

// 
export const getUserRoles = async (userId) => {
  const { roles, error } = await supabase.from("users_roles").select("role_id, roles (name)").eq("user_id", userId)
  if (error) { return null }
  return roles
}

// Attempt to retrieve events given user location and radius (in meters)
export const get_events_within_radius = async (lng, lat, radius) => {
  try {
    const { data, error } = await supabase.rpc('events_within_radius', {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      radius: parseFloat(radius),
    });

    if (error) {
      throw error;
    }
    for (let i = 0; i < data.length; i++) {
      try {
        data[i].latitude, data[i].longitude = location.wkbToCoords(data[i].location);
      } catch(error) {
        console.error("Error parsing event data: ", error)
      }
    }
    return data;

  } catch (error) {
    console.error("Error fetching events in radius: ", error)
    return []
  }
}
