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
