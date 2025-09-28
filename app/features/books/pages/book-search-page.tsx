import type { Route } from "./+types/book-search-page";

import { Form } from "react-router";
import z from "zod";

import type { Book } from "~/common/bookmaru";
import { searchBooksByTitle } from "~/common/bookmaru";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { parseFormData } from "~/common/parsers";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";

import { BookCard } from "../components/book-card";

const formSchema = z.object({
  search: z.string(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);

  const { error, data } = await parseFormData(formSchema, request);
  if (error) {
    return { ...error, books: [] };
  }

  const books = await searchBooksByTitle(data.search);

  return { formErrors: undefined, books };
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "도서 검색 | 도서관⁺" },
    { name: "description", content: "간편한 도서관 도서 검색" },
  ];
};

export default function BookSearchPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title="도서 검색" subtitle="여러 도서관의 도서를 한 번에 검색하세요" />
      <div className="space-y-10">
        <Form
          method="post"
          className="mx-auto flex max-w-screen-sm items-center justify-center gap-2"
        >
          <Input name="search" placeholder="책이름" className="text-lg" />
          <Button type="submit">검색</Button>
        </Form>
        {actionData?.books && (
          <div className="mx-auto max-w-screen-sm">
            <div className="flex flex-col gap-4">
              {actionData.books.length === 0 ? (
                <div className="mx-auto">검색 결과가 없습니다.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="mx-auto">검색 결과</div>
                  {actionData.books.map((book: Book) => (
                    <BookCard
                      key={book.isbn13}
                      isbn={book.isbn13}
                      image={book.bookImageURL}
                      title={book.bookname}
                      author={book.authors}
                      publisher={book.publisher}
                      published={book.publication_year}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
