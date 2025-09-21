import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "~/supa-client";

export type Library = {
  libCode: string;
  libName: string;
  address: string | null;
  tel: string | null;
  fax: string | null;
  latitude: string | null;
  longitude: string | null;
  homepage: string | null;
  closed: string | null;
  operatingTime: string | null;
  BookCount: string;
};

export const updateLibraries = async (client: SupabaseClient<Database>, libraries: Library[]) => {
  const libs = libraries.map((lib) => ({
    lib_code: lib.libCode,
    lib_name: lib.libName,
    address: lib.address,
    tel: lib.tel,
    fax: lib.fax,
    latitude: lib.latitude,
    longitude: lib.longitude,
    homepage: lib.homepage,
    closed: lib.closed,
    operating_time: lib.operatingTime,
    book_count: lib.BookCount,
  }));

  const { error, data } = await client.from("libraries").upsert(libs, { onConflict: "lib_code" });
  if (error) {
    throw error;
  }

  return data;
};
