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

export const getImageUrl = async (eventId) => {
  let {data, error} = await supabase.from("events").select("image_url")
  if (error) {
    console.log("Error getting URL:", error)
    return null
  }
  /*
  { data, error } = await supabase.storage.from("images").download(data.image_url)
  if (error) {
    console.log("Error getting URL:", error)
    return null
  }*/
  return data.length > 0 ? data[0].image_url : null;
}

export const uploadImage = async (file) => {
  const { data, error } = await supabase.storage
    .from('images') // Replace with your bucket name
    .upload(`images/${file.name}`, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Get the public URL of the uploaded image
  const url = `${supabase.storage.from('images').getPublicUrl(data.path).publicUrl}`;
  return url;
};


export const saveImageUrl = async (eventId) => {
  const { data, error } = await supabase
    .from('images')
    .update({ image_url }).eq("id", eventId);

  if (error) {
    console.error('Error saving image URL:', error);
    return null;
  }

  return data;
};

export const uploadAndSaveImage = async (file, eventId) => {
  const imageUrl = await uploadImage(file);
  if (imageUrl) {
    const result = await saveImageUrl(userId, imageUrl);
    return result;
  }
  return null;
};