import type { Route } from "./+types/library-catalog-page";

import z from "zod";

import { checkLoanAvailabilities, searchLibrariesByIsbn } from "~/common/bookmaru";
import { parseParams } from "~/common/parsers";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";

import { getLibraryInfosToCheckout } from "../queries";

const paramsSchema = z.object({
  isbn: z.string().min(10).max(13),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);

  const isbn = parseParams(paramsSchema, params).isbn;
  console.log("isbn", isbn);
  // TODO: isbn 검증

  // TODO: 도서관 코드 리스트 받아오기
  const libCodes = ["111013", "111148", "111439", "111377", "111531"];
  const detailRegions = ["11200", "11220"];

  const holdingLibCodes = await searchLibrariesByIsbn(isbn, detailRegions);
  const myHoldingLibCodes = holdingLibCodes.filter((libCode) => libCodes.includes(libCode));

  // TODO: 실시간 정보로 변경
  const [availables, libraryInfos] = await Promise.all([
    checkLoanAvailabilities(isbn, myHoldingLibCodes),
    getLibraryInfosToCheckout(client, myHoldingLibCodes),
  ]);

  libraryInfos.forEach((info) => {
    const available = availables[info.lib_code];
    availables[info.lib_code] = { ...info, available };
  });

  const sortedAvailables = Object.values(availables);
  sortedAvailables.sort((a, b) => {
    if (a.available !== b.available) {
      return a.available ? -1 : 1;
    }
    return a.lib_code.localeCompare(b.lib_code);
  });

  return { libs: sortedAvailables };
};
