"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: string
  name: string
  address: string
  manager: string
  startDate: string
  endDate: string
  status: "준비중" | "진행중" | "완료" | "보류"
  materialCount: number
  toolCount: number
}

const data: Project[] = [
  {
    id: "1",
    name: "강남 오피스텔 리모델링",
    address: "서울시 강남구 역삼동 123-45",
    manager: "김현장",
    startDate: "2023-04-01",
    endDate: "2023-05-15",
    status: "진행중",
    materialCount: 12,
    toolCount: 5,
  },
  {
    id: "2",
    name: "송파 아파트 인테리어",
    address: "서울시 송파구 잠실동 456-78",
    manager: "이기사",
    startDate: "2023-04-10",
    endDate: "2023-05-20",
    status: "진행중",
    materialCount: 8,
    toolCount: 3,
  },
  {
    id: "3",
    name: "마포 카페 시공",
    address: "서울시 마포구 합정동 789-12",
    manager: "최기술",
    startDate: "2023-03-15",
    endDate: "2023-04-30",
    status: "완료",
    materialCount: 15,
    toolCount: 4,
  },
  {
    id: "4",
    name: "분당 사무실 인테리어",
    address: "경기도 성남시 분당구 서현동 345-67",
    manager: "박시공",
    startDate: "2023-04-20",
    endDate: "2023-06-10",
    status: "준비중",
    materialCount: 0,
    toolCount: 0,
  },
  {
    id: "5",
    name: "일산 주택 리모델링",
    address: "경기도 고양시 일산동구 장항동 234-56",
    manager: "김현장",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    status: "준비중",
    materialCount: 0,
    toolCount: 0,
  },
  {
    id: "6",
    name: "강서 병원 인테리어",
    address: "서울시 강서구 화곡동 567-89",
    manager: "이기사",
    startDate: "2023-02-15",
    endDate: "2023-04-15",
    status: "완료",
    materialCount: 20,
    toolCount: 6,
  },
  {
    id: "7",
    name: "광진 음식점 리모델링",
    address: "서울시 광진구 구의동 890-12",
    manager: "최기술",
    startDate: "2023-03-01",
    endDate: "2023-04-20",
    status: "완료",
    materialCount: 10,
    toolCount: 2,
  },
  {
    id: "8",
    name: "용산 호텔 객실 리뉴얼",
    address: "서울시 용산구 한남동 123-45",
    manager: "박시공",
    startDate: "2023-04-15",
    endDate: "2023-07-30",
    status: "진행중",
    materialCount: 25,
    toolCount: 8,
  },
]

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          현장명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: "주소",
    cell: ({ row }) => <div className="max-w-[180px] truncate">{row.getValue("address")}</div>,
  },
  {
    accessorKey: "manager",
    header: "담당자",
    cell: ({ row }) => <div>{row.getValue("manager")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "시작일",
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "종료일",
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "진행중"
              ? "default"
              : status === "완료"
                ? "secondary"
                : status === "준비중"
                  ? "outline"
                  : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "materialCount",
    header: "자재 수",
    cell: ({ row }) => <div className="text-center">{row.getValue("materialCount")}</div>,
  },
  {
    accessorKey: "toolCount",
    header: "공구 수",
    cell: ({ row }) => <div className="text-center">{row.getValue("toolCount")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>작업</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
              현장 정보 보기
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>자재 요청</DropdownMenuItem>
            <DropdownMenuItem>공구 대여</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>수정</DropdownMenuItem>
            <DropdownMenuItem>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProjectsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              표시 항목 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id === "name"
                      ? "현장명"
                      : column.id === "address"
                        ? "주소"
                        : column.id === "manager"
                          ? "담당자"
                          : column.id === "startDate"
                            ? "시작일"
                            : column.id === "endDate"
                              ? "종료일"
                              : column.id === "status"
                                ? "상태"
                                : column.id === "materialCount"
                                  ? "자재 수"
                                  : column.id === "toolCount"
                                    ? "공구 수"
                                    : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          총 <strong>{table.getFilteredRowModel().rows.length}</strong>개 항목 중{" "}
          <strong>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}
          </strong>
          개 표시
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          이전
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          다음
        </Button>
      </div>
    </div>
  )
}

