import type { RouteConfig } from "@react-router/dev/routes";

import { index, prefix, route } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  ...prefix("libraries", [
    route("/:isbn", "features/libraries/pages/library-catalog-page.tsx"),
    route("/update", "features/libraries/pages/library-update-page.tsx"),
  ]),
  route("/search", "features/books/pages/book-search-page.tsx"),
] satisfies RouteConfig;
