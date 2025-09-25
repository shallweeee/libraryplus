import type { RouteConfig } from "@react-router/dev/routes";

import { index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  ...prefix("libraries", [
    route("/:isbn", "features/libraries/pages/library-catalog-page.tsx"),
    route("/update", "features/libraries/pages/library-update-page.tsx"),
  ]),
  route("/search", "features/books/pages/book-search-page.tsx"),
  ...prefix("/auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
    ]),
    route("/logout", "features/auth/pages/logout-page.tsx"),
  ]),
] satisfies RouteConfig;
