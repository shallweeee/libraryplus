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
