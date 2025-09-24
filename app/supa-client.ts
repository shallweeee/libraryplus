import type { CookieMethodsServer } from "@supabase/ssr";

import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const cookieMethods: CookieMethodsServer = {
    getAll() {
      const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
      return cookies.map(({ name, value }) => ({ name, value: value ?? "" }));
    },
    setAll(cookies) {
      cookies.forEach(({ name, value, options }) => {
        headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
      });
    },
  };

  const serverSideClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { cookies: cookieMethods }
  );

  return { client: serverSideClient, headers };
};
