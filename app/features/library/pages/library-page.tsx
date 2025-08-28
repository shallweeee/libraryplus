import type { Route } from "./+types/library-page";

import { Link } from "react-router";

import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Checkbox } from "~/common/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/common/components/ui/table";

export const loader = ({ params }: Route.LoaderArgs) => {
  const libraries = [
    {
      id: "1",
      checked: true,
      name: "서울시교육청 동작도서관",
      url: "https://djlib.sen.go.kr/",
      digital: false,
      groupId: "1",
      group: "서울시교육청",
    },
    {
      id: "2",
      checked: true,
      name: "서초구립 반포도서관",
      url: "https://www.seocholib.or.kr/",
      digital: false,
      groupId: "2",
      group: "서초구립",
    },
    {
      id: "3",
      checked: false,
      name: "사당솔밭도서관",
      url: "https://lib.dongjak.go.kr/",
      digital: false,
      groupId: "3",
      group: "동작구",
    },
  ];
  return { libraries: libraries };
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "도서관 리스트 | 도서관⁺" },
    { name: "description", content: "간편한 도서관 도서 검색" },
  ];
};

export default function LibraryPage({ loaderData }: Route.ComponentProps) {
  //console.log(loaderData.libraries);
  return (
    <div className="space-y-10">
      <Hero title="도서관 리스트" subtitle="검색할 도서관을 선택하세요." />
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>이름</TableHead>
              <TableHead>홈페이지</TableHead>
              <TableHead>그룹</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaderData.libraries.map((library) => (
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{library.name}</TableCell>
                <TableCell>
                  <Link to={library.url}>{library.url}</Link>
                </TableCell>
                <TableCell>{library.group}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
}
