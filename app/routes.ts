import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  route("/search", "features/search/pages/search-page.tsx"),
] satisfies RouteConfig;
