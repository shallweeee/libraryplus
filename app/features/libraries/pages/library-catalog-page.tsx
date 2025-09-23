import type { Route } from "./+types/library-catalog-page";

import { z } from "zod";

import { checkLoanAvailabilities, searchLibrariesByIsbn } from "~/common/bookmaru";
import { parseParams } from "~/common/parsers";

const paramsSchema = z.object({
  isbn: z.string().min(10).max(13),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  /*
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
*/
  const isbn = parseParams(paramsSchema, params).isbn;
  console.log("isbn", isbn);
  // TODO: isbn 검증

  // TODO: 도서관 코드 리스트 받아오기
  const libCodes = ["111013", "111148", "111439", "111377", "111531"];
  const detailRegions = ["11200", "11220"];

  const holdingLibCodes = await searchLibrariesByIsbn(isbn, detailRegions);
  const holdingLibs = holdingLibCodes.filter((libCode) => libCodes.includes(libCode));
  const availables = await checkLoanAvailabilities(isbn, holdingLibs);
  return { data: availables };
};

export const meta: Route.MetaFunction = () => {
  return [{ title: "소장 도서관 | 도서관⁺" }];
};
