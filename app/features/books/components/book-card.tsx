import { useFetcher } from "react-router";

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

  const onClick = () => {
    console.log("here");
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
        {fetcher.state === "idle" && fetcher.data && (
          <CardFooter>{JSON.stringify(fetcher.data.data)}</CardFooter>
        )}
      </Card>
    </div>
  );
}
