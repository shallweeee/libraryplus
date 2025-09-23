export const buildUrl = (path: string, params?: URLSearchParams) => {
  if (!params) {
    params = new URLSearchParams();
  }

  params.set("authKey", process.env.BOOKNARU_KEY!);
  params.set("format", "json");
  return `${process.env.BOOKNARU_URL!}/${path}?${params.toString()}`;
};

export const getTotalNumber = async (api: string) => {
  const url = buildUrl(api);
  const r = await fetch(url);
  const res = await r.json();
  return res?.response?.numFound;
};

export type Library = {
  libCode: string;
  libName: string;
  address: string | null;
  tel: string | null;
  fax: string | null;
  latitude: string | null;
  longitude: string | null;
  homepage: string | null;
  closed: string | null;
  operatingTime: string | null;
  BookCount: string;
};

export type Book = {
  bookname: string;
  authors: string;
  publisher: string;
  publication_year: string;
  isbn13: string;
  addition_symbol: string;
  vol: string;
  class_no: string;
  class_nm: string;
  bookImageURL: string;
  bookDtlUrl: string;
  loan_count: string;
};

export type BookExist = {
  hasBook: "Y" | "N";
  loanAvailable: "Y" | "N";
};

export const searchBooksByTitle = async (title: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set("pageSize", "400");
  searchParams.set("sort", "pubYear");
  searchParams.set("order", "desc");
  searchParams.set("title", title);
  const url = buildUrl("srchBooks", searchParams);

  const r = await fetch(url);
  const res = await r.json();
  return res.response?.docs.map(({ doc }: { doc: Book }) => doc);
};

export const searchLibrariesByIsbn = async (isbn: string, detailRegions: string[]) => {
  const commonParams = { pageNo: "1", pageSize: "400", isbn: isbn };
  //const detailRegions = Array.from(new Set(libCodes.map((libCode) => libCode.substring(0, 5))));
  const paramsList = detailRegions.map(
    (dtr) => new URLSearchParams({ ...commonParams, region: dtr.substring(0, 2), dtl_region: dtr })
  );
  const urls = paramsList.map((query) => buildUrl("libSrchByBook", query));
  //console.log("urls", urls);
  const rs = await Promise.all(urls.map((url) => fetch(url)));
  // TODO: 에러 확인
  //console.log("rs", rs);
  const ress = await Promise.all(rs.map((r) => r.json()));
  // TODO: 상태 코드 확인
  //console.log("ress", ress);
  const holdingLibCodes: string[] = ress.flatMap((item) =>
    item.response.libs.map(({ lib }: { lib: Library }) => lib.libCode)
  );
  //console.log("holdingLibCodes", holdingLibCodes);
  return holdingLibCodes;
};

export const checkLoanAvailabilities = async (isbn: string, libCodes: string[]) => {
  const paramsList = libCodes.map((libCode) => new URLSearchParams({ libCode, isbn13: isbn }));
  const urls = paramsList.map((query) => buildUrl("bookExist", query));
  const rs = await Promise.all(urls.map((url) => fetch(url)));
  // TODO: 에러 확인
  const ress = await Promise.all(rs.map((r) => r.json()));
  // TODO: 상태 코드 확인
  //console.log("ress", ress);
  const result = ress
    .filter((res) => res.response.result.hasBook === "Y")
    .map((res) => [res.response.request.libCode, res.response.result.loanAvailable]);
  //console.log("result", result);
  return result;
};
