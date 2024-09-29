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


export const getUserRoles = async (userId) => {
  const { roles, error } = await supabase.from("users_roles").select("role_id, roles (name)").eq("user_id", userId)
  if (error) { return null }
  return roles
}

const allowedStatuses = ["Unresolved", "Resolved"]

export const updateEventStatus = async (eventId, status) => {
  if (!allowedStatuses.includes(status)) {
    console.error("Invalid status:", status)
    return null
  }
  const { data, error } = await supabase.from("events").update({ status }).eq("id", eventId)
  if (error) { return null }
  return data
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
