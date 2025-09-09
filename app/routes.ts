import type { RouteConfig } from "@react-router/dev/routes";

import { index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  route("/search", "features/library/pages/search-page.tsx"),
  ...prefix("/libraries", [
    index("features/library/pages/library-redirect-page.tsx"),
    route("/list", "features/library/pages/library-page.tsx"),
    route("/request", "features/library/pages/library-request-page.tsx"),
  ]),
  ...prefix("/auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
    ]),
    route("/logout", "features/auth/pages/logout-page.tsx"),
  ]),
] satisfies RouteConfig;
