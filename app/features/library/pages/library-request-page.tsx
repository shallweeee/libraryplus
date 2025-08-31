import type { Route } from "./+types/library-request-page";

import { Form } from "react-router";

import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/common/components/ui/table";

interface RequestItem {
  url: string;
  status: string;
  requested_at: string;
  processed_at?: string;
  reason?: string;
}

export const loader = ({ params }: Route.LoaderArgs) => {
  const requests = [
    {
      url: "https://lib.dongjak.go.kr/dj/index.do",
      status: "requested",
      requested_at: "2025-09-01",
      processed_at: null,
      reason: null,
    },
  ];
  return { requests: requests };
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "도서관 등록 요청 | 도서관⁺" },
    { name: "description", content: "간편한 도서관 도서 검색" },
  ];
};

export default function LibraryRequestPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title="도서관 등록 요청" subtitle="검색하고 싶은 도서관을 등록하세요" />
      <Form className="mx-auto flex max-w-screen-sm items-center justify-center gap-2 p-2">
        <Input
          name="request"
          placeholder="등록 요청할 도서관 URL을 입력하세요."
          className="text-lg"
        />
        <Button type="submit">요청</Button>
      </Form>

      {loaderData.requests.length > 0 ? (
        <div className="mt-20">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>요청일</TableHead>
                <TableHead>처리일</TableHead>
                <TableHead>비고</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loaderData.requests.map((request) => (
                <TableRow>
                  <TableCell>{request.url}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.requested_at}</TableCell>
                  <TableCell>{request.processed_at}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
