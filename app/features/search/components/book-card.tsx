import { Link } from "react-router";

import { Badge } from "~/common/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  publisher: string;
  published: string;
  books: {
    library: string;
    url: string;
    status: string;
  }[];
}

export function BookCard({ image, title, author, publisher, published, books }: BookCardProps) {
  return (
    <>
      <Card className="flex flex-row">
        <CardHeader className="y-[156px] w-[105px]">
          <img src={image} />
        </CardHeader>
        <CardContent>
          <div>{title}</div>
          <div>저자: {author}</div>
          <div>발행처: {publisher}</div>
          <div>발행년도: {published}</div>
        </CardContent>
      </Card>
      <ul>
        {books.map((book) => (
          <li>
            <Badge variant="outline">{book.status}</Badge>
            <Link to={book.url}> {book.library}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
