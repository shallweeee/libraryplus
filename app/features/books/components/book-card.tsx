import { Link } from "react-router";

import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

interface BookCardProps {
  isbn: string;
  image: string;
  title: string;
  author: string;
  publisher: string;
  published: string;
}

export function BookCard({ isbn, image, title, author, publisher, published }: BookCardProps) {
  return (
    <Link to={`/libraries/${isbn}`}>
      <Card className="flex flex-row">
        <CardHeader className="y-[156px] w-[105px]">
          <img src={image} />
        </CardHeader>
        <CardContent className="flex flex-col items-start">
          <div>제목: {title}</div>
          <div>저자: {author}</div>
          <div>발행: {publisher}</div>
          <div>연도: {published}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
