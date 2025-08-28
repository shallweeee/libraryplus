import type { ColumnDef } from "@tanstack/react-table";

import type { Route } from "./+types/library-page";

import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Checkbox } from "~/common/components/ui/checkbox";

import { DataTable } from "../components/data-table";

type Library = {
  id: string;
  name: string;
  url: string;
  group: string;
};

export const loader = ({ params }: Route.LoaderArgs) => {
  const libraries: Library[] = [
    {
      id: "m5gr84i9",
      name: "서울시교육청 동작도서관",
      url: "https://djlib.sen.go.kr/",
      group: "서울시교육청",
    },
    {
      id: "3u1reuv4",
      name: "서초구립 반포도서관",
      url: "https://www.seocholib.or.kr/",
      group: "서초구립",
    },
    {
      id: "derv1ws0",
      name: "사당솔밭도서관",
      url: "https://lib.dongjak.go.kr/",
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
  const columns: ColumnDef<Library>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "이름",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "url",
      header: "홈페이지",
      cell: ({ row }) => <div className="capitalize">{row.getValue("url")}</div>,
    },
    {
      accessorKey: "group",
      header: "그룹",
      cell: ({ row }) => <div className="capitalize">{row.getValue("group")}</div>,
    },
  ];

  return (
    <div className="space-y-10">
      <Hero title="도서관 리스트" subtitle="검색할 도서관을 선택하세요." />
      <DataTable columns={columns} data={loaderData.libraries} />
      <div className="flex justify-end space-x-2">
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
}
