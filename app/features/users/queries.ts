import type { SupabaseClient } from "@supabase/supabase-js";

import { redirect } from "react-router";

export const getLoggedInUserId = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};

export const getMyLibraries = async (client: SupabaseClient, id: string) => {
  const { error, data } = await client
    .from("profiles_libraries")
    .select("lib_code, dtl_region")
    .eq("profile_id", id);
  if (error) {
    throw error;
  }

  return data;
};
