import type { SupabaseClient } from "@supabase/supabase-js";

export const getLibraryInfosToCheckout = async (client: SupabaseClient, libCodes: string[]) => {
  const { error, data } = await client
    .from("libraries")
    .select("lib_code, lib_name, homepage")
    .in("lib_code", libCodes);
  if (error) {
    throw error;
  }

  return data;
};
