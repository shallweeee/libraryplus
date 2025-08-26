import type { Route } from "./+types/search-page";

import { Button } from "~/common/components/ui/button";

import { BookCard } from "../components/book-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "검색 | 도서관⁺" }, { name: "description", content: "간편한 도서관 도서 검색" }];
};

export const loader = () => {
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

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <div className="flex flex-col gap-8">
      <h1>검색</h1>
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <form className="flex gap-4">
          <input type="text" placeholder="검색어를 입력하세요" />
          <Button>검색</Button>
        </form>
      </div>
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
