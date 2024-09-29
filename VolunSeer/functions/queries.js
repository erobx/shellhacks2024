import supabase from "./supabaseClient";

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

export const getNearbyEvents = async (lat, lon, range) => {
  const {events, error} = await supabase
  .rpc("events_within_radius", {
    lat: lat,
    lon: lon,
    radius: radius // in some units
  }).select("location", "type", "id", "name");
}




