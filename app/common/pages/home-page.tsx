import type { Route } from "./+types/home-page";

import { Link } from "react-router";

import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [{ title: "도서관⁺" }];
};

export default function HomePage() {
  return (
    <div>
      <Hero title="도서관⁺" subtitle="" />
      <div className="flex flex-col items-center">
        <div>간편한 도서관 도서 검색 서비스</div>
        <div>한 번의 입력으로 여러 도서관을 동시에 검색</div>
        <div>대출 가능 도서관이 한 눈에</div>
        <div>중복 도서는 하나로</div>
        <br />
        <br />
        <div>
          지금{" "}
          <Link to="/auth/join" className="font-bold">
            가입
          </Link>
          하세요.
        </div>
      </div>
    </div>
  );
}
