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

export const getAllLibraries = async (client: SupabaseClient) => {
  const { error, data } = await client
    .from("libraries")
    .select("lib_name, address")
    // TODO: 우선 동작구, 서초구 도서관만으로 검증. 작은도서관도 제외.
    .or("address.like.서울특별시 동작구%, address.like.서울특별시 서초구%")
    .not("lib_name", "like", "%작은도서관%")
    .not("lib_name", "like", "%책사랑방%")
    .order("address", { ascending: true });
  if (error) {
    throw error;
  }

  return data;
};
