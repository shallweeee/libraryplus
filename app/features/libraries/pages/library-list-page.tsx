import type { Route } from "./+types/library-list-page";

import { Hero } from "~/common/components/hero";
import { makeSSRClient } from "~/supa-client";

import { LibraryGroup } from "../components/library-group";
import { getAllLibraries } from "../queries";

// TODO: 응답 caching
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const libraries = await getAllLibraries(client);

  // sort
  const sortedLibraries = libraries.map((lib) => {
    const keys = lib.address.split(" ");
    return { ...lib, key1: keys[0], key2: keys[1] };
  });
  sortedLibraries.sort((a, b) => {
    for (const key of ["key1", "key2", "lib_name"]) {
      const cmp = a[key].localeCompare(b[key]);
      if (cmp !== 0) return cmp;
    }
    return 0;
  });

  // group
  const grouppedLibraries = sortedLibraries.reduce((acc, lib) => {
    const { key1, key2, ...rest } = lib;
    acc[key1] = acc[key1] || {};
    acc[key1][key2] = acc[key1][key2] || [];
    acc[key1][key2].push(rest);
    return acc;
  }, {});

  return { grouppedLibraries, total: libraries.length };
};

export const meta: Route.MetaFunction = () => {
  return [{ title: "도서관 목록| 도서관⁺" }];
};

export default function LibraryListPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title="검색 가능 도서관" />
      <div className="flex flex-col items-center gap-10">
        <div>
          <div>안내: 현재 지원되는 도서관은 {loaderData.total} / 1576개이며,</div>
          <div>안정화 및 검증이 진행되는 순으로 추가 예정입니다.</div>
        </div>
        <LibraryGroup groups={loaderData.grouppedLibraries} />
      </div>
    </div>
  );
}
