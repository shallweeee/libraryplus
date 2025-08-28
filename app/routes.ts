import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  route("/search", "features/library/pages/search-page.tsx"),
  route("/libraries", "features/library/pages/library-page.tsx"),
  ...prefix("/auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
