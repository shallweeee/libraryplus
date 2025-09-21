import type { Library } from "../mutations";
import type { Route } from "./+types/library-update-page";

import { buildUrl, getTotalNumber } from "~/common/bookmaru";
import { makeSSRClient } from "~/supa-client";

import { updateLibraries } from "../mutations";

export const loader = async () => {
  return new Response(null, { status: 404 });
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const key = request.headers.get("X-POTATO");
  if (!key || key !== "TOMATO") {
    return new Response(null, { status: 404 });
  }

  const api = "libSrch";
  const reqPageSize = 200;

  const searchParams = new URLSearchParams();
  searchParams.set("pageSize", reqPageSize.toString());

  const totalNumber = await getTotalNumber(api);
  const loopCount = Math.ceil(totalNumber / reqPageSize);

  for (let page = 1; page <= loopCount; ++page) {
    searchParams.set("pageNo", page.toString());

    const url = buildUrl(api, searchParams);

    const r = await fetch(url);
    const res = await r.json();
    const {
      response: { pageNo, pageSize, numFound, resultNum, libs },
    } = res;
    console.log(pageNo, pageSize, numFound, resultNum);

    await updateLibraries(
      client,
      libs.map(({ lib }: { lib: Library }) => lib)
    );
  }

  return { count: totalNumber };
};
