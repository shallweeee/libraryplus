import type { Route } from "./+types/search-page";

import { Form } from "react-router";
import { z } from "zod";

import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";

import { BookCard } from "../components/book-card";

const paramsSchema = z.object({
  query: z.string().optional().default(""),
});

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid params");
  }

  console.log(parsedData);

  return [
    {
      image: "https://image.aladin.co.kr/product/31629/43/cover/8934942460_1.jpg",
      title: "총, 균, 쇠 : 인간 사회의 운명을 바꾼 힘",
      author: "재레드 다이아몬드",
      publisher: "김영사",
      published: "2023",
      books: [
        {
          library: "서울시교육청 동작도서관",
          url: "https://djlib.sen.go.kr/djlib/intro/search/detail.do?vLoca:111013&vCtrl=5700457353&isbn=9788934942467&menu_idx=4",
          status: "available",
        },
        {
          library: "서초구립반포도서관",
          url: "https://www.seocholib.or.kr/bookDetail/MO/163439226/163439224/9788934942467",
          status: "checkouted",
        },
      ],
    },
    {
      image: "https://image.aladin.co.kr/product/32319/34/cover/k972834556_1.jpg",
      title: "(10대를 위한)총균쇠 수업",
      author: "김정진",
      publisher: "넥스트씨",
      published: "2023",
      books: [
        {
          library: "서초구립반포도서관",
          url: "https://www.seocholib.or.kr/bookDetail/MO/166354887/166354881/9791198026811",
          status: "available",
        },
      ],
    },
  ];
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "도서 검색 | 도서관⁺" },
    { name: "description", content: "간편한 도서관 도서 검색" },
  ];
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="도서 검색" subtitle="여러 도서관에서 도서를 한번에 검색하세요" />
      <Form className="mx-auto flex max-w-screen-sm items-center justify-center gap-2">
        <Input name="query" placeholder="책이름" className="text-lg" />
        <Button type="submit">검색</Button>
      </Form>
      <div>
        <div>검색 도서관</div>
        <ul>
          <li>서울시교육청 동작도서관</li>
          <li>서초구립반포도서관</li>
        </ul>
      </div>
      <div>
        <div>검색 결과</div>
        {loaderData.map((book, i) => (
          <BookCard
            key={i}
            image={book.image}
            title={book.title}
            author={book.author}
            publisher={book.publisher}
            published={book.published}
            books={book.books}
          />
        ))}
      </div>
    </div>
  );
}
