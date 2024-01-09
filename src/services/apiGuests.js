import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) throw new Error("Guest is not found");

  return data;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest }])
    .select();

  if (error) throw new Error("Failed to create a new Guest");

  return data;
}
