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
            <div className="flex flex-col gap-4">
              <div>
                안내: 대출 정보는 전날 데이터로 현재와 다를 수 있습니다. 실시간 정보로 변경
                중입니다.
              </div>
              <ul className="flex flex-col items-start gap-1">
                {libs.map((lib) => (
                  <div className="flex gap-4">
                    {lib.available ? (
                      <Badge variant="secondary" className="w-20 text-center">
                        대출 가능
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="w-20 text-center">
                        대출 중
                      </Badge>
                    )}
                    <Button variant="link" asChild>
                      <a href={lib.homepage} target="_blank" rel="noopener noreferrer">
                        {lib.lib_name}
                      </a>
                    </Button>
                  </div>
                ))}
              </ul>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
