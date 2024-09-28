import supabase from "./supabaseClient";

export const getUserNames = async () => {
  const { data, error } = await supabase.from("users").select();
  if (error) {
    return [];
  }
  return data;
}
