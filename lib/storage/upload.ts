import { supabase } from "../supabase";

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("outfit-images")
    .upload(fileName, file);

  if (error) {
    alert(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("outfit-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}