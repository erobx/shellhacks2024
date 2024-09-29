import supabase from "./supabaseClient";

export const getUserNames = async () => {
  const { data, error } = await supabase.from("users").select();
  if (error) {
    return [];
  }
  return data;
}

// All data from a single user
export const getUser = async (userId) => {
  const { user, error } = await supabase.from("users").select("*").eq("id", userId).single()
  if (error) { return null }
  return user
}

// Need user events
export const getUserEvents = async () => {

}

// 
export const getUserRoles = async (userId) => {
  const { roles, error } = await supabase.from("users_roles").select("role_id, roles (name)").eq("user_id", userId)
  if (error) { return null }
  return roles
}
