import supabase, { supabaseUrl } from "./supabase";

// READ/SELECT
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins failed to load");
  }

  return data;
}

//CREATE & EDIT (i hate this mix)
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1 - create/edit cabin
  let query = supabase.from("cabins");

  // A - CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //  B - EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //2 - upload image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    //3 - deleting the cabin if there was an error when uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "Cabin image could not be uploaded and failed to create a new cabin"
      );
    }
  }

  return data;
}

// DELETE
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
}
