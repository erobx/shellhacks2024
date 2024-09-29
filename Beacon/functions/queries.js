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

const allowedStatuses = ["Unresolved", "Resolved"]
export const updateEventStatus = async (eventId, status) => {
  if (!allowedStatuses.includes(status)) {
    console.error("Invalid status:", status)
    return null
  }
  const { error } = await supabase.from("events").update({ status }).eq("id", eventId)
  if (error) { return null }
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
