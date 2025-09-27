import { Link, useFetcher } from "react-router";

import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/common/components/ui/card";

interface BookCardProps {
  isbn: string;
  image: string;
  title: string;
  author: string;
  publisher: string;
  published: string;
}

export function BookCard({ isbn, image, title, author, publisher, published }: BookCardProps) {
  const fetcher = useFetcher();
  const libs = fetcher.data?.libs;

  const onClick = () => {
    fetcher.submit(null, {
      method: "POST",
      action: `/libraries/${isbn}`,
    });
  };

  return (
    <div onClick={onClick}>
      <Card className="flex flex-col">
        <div className="flex flex-row">
          <CardHeader className="y-[156px] w-[105px]">
            <img src={image} />
          </CardHeader>
          <CardContent className="flex flex-col items-start">
            <div>{title}</div>
            <div>{author}</div>
            <div>
              {published}, {publisher}
            </div>
          </CardContent>
        </div>
        {fetcher.state !== "idle" && <CardFooter>확인중</CardFooter>}
        {fetcher.state === "idle" && libs && (
          <CardFooter>
            <ul className="flex flex-col items-start">
              {libs.map((lib) => (
                <div className="flex gap-4">
                  <Button variant="link" asChild>
                    <a href={lib.homepage} target="_blank" rel="noopener noreferrer">
                      {lib.lib_name}
                    </a>
                  </Button>
                  {lib.available ? (
                    <Badge variant="secondary">대출 가능</Badge>
                  ) : (
                    <Badge variant="outline">대출 중</Badge>
                  )}
                </div>
              ))}
            </ul>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
