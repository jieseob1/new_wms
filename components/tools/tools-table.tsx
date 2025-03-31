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

type Tool = {
  id: string
  code: string
  name: string
  category: string
  status: "대여가능" | "대여중" | "수리중" | "분실"
  borrower: string | null
  project: string | null
  borrowDate: string | null
  returnDate: string | null
  condition: "좋음" | "보통" | "나쁨"
}

const data: Tool[] = [
  {
    id: "1",
    code: "TL-DR-01",
    name: "전동드릴 세트",
    category: "전동공구",
    status: "대여중",
    borrower: "이기사",
    project: "송파 아파트 인테리어",
    borrowDate: "2023-04-12",
    returnDate: "2023-04-19",
    condition: "좋음",
  },
  {
    id: "2",
    code: "TL-LV-01",
    name: "레이저 레벨기",
    category: "측정공구",
    status: "대여가능",
    borrower: null,
    project: null,
    borrowDate: null,
    returnDate: null,
    condition: "좋음",
  },
  {
    id: "3",
    code: "TL-CT-01",
    name: "타일 커터",
    category: "수공구",
    status: "대여중",
    borrower: "최기술",
    project: "마포 카페 시공",
    borrowDate: "2023-04-10",
    returnDate: "2023-04-17",
    condition: "보통",
  },
  {
    id: "4",
    code: "TL-GR-01",
    name: "그라인더",
    category: "전동공구",
    status: "수리중",
    borrower: null,
    project: null,
    borrowDate: null,
    returnDate: null,
    condition: "나쁨",
  },
  {
    id: "5",
    code: "TL-HM-01",
    name: "해머드릴",
    category: "전동공구",
    status: "대여중",
    borrower: "김현장",
    project: "강남 오피스텔 리모델링",
    borrowDate: "2023-04-08",
    returnDate: "2023-04-15",
    condition: "좋음",
  },
  {
    id: "6",
    code: "TL-SC-01",
    name: "전동 스크류드라이버",
    category: "전동공구",
    status: "대여가능",
    borrower: null,
    project: null,
    borrowDate: null,
    returnDate: null,
    condition: "좋음",
  },
  {
    id: "7",
    code: "TL-MS-01",
    name: "마이터 톱",
    category: "전동공구",
    status: "분실",
    borrower: "박시공",
    project: "강서 병원 인테리어",
    borrowDate: "2023-03-20",
    returnDate: null,
    condition: "나쁨",
  },
  {
    id: "8",
    code: "TL-HG-01",
    name: "열풍기",
    category: "전동공구",
    status: "대여가능",
    borrower: null,
    project: null,
    borrowDate: null,
    returnDate: null,
    condition: "보통",
  },
]

export const columns: ColumnDef<Tool>[] = [
  {
    accessorKey: "code",
    header: "코드",
    cell: ({ row }) => <div className="font-medium">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          공구명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "분류",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "대여가능"
              ? "outline"
              : status === "대여중"
                ? "default"
                : status === "수리중"
                  ? "secondary"
                  : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "borrower",
    header: "대여자",
    cell: ({ row }) => <div>{row.getValue("borrower") || "-"}</div>,
  },
  {
    accessorKey: "project",
    header: "현장",
    cell: ({ row }) => <div>{row.getValue("project") || "-"}</div>,
  },
  {
    accessorKey: "borrowDate",
    header: "대여일",
    cell: ({ row }) => <div>{row.getValue("borrowDate") || "-"}</div>,
  },
  {
    accessorKey: "returnDate",
    header: "반납예정일",
    cell: ({ row }) => <div>{row.getValue("returnDate") || "-"}</div>,
  },
  {
    accessorKey: "condition",
    header: "상태",
    cell: ({ row }) => {
      const condition = row.getValue("condition") as string
      return (
        <Badge variant={condition === "좋음" ? "outline" : condition === "보통" ? "secondary" : "destructive"}>
          {condition}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tool = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(tool.id)}>공구 정보 보기</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>대여 처리</DropdownMenuItem>
            <DropdownMenuItem>반납 처리</DropdownMenuItem>
            <DropdownMenuItem>수리 요청</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>수정</DropdownMenuItem>
            <DropdownMenuItem>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ToolsTable() {
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
                    {column.id === "code"
                      ? "코드"
                      : column.id === "name"
                        ? "공구명"
                        : column.id === "category"
                          ? "분류"
                          : column.id === "status"
                            ? "상태"
                            : column.id === "borrower"
                              ? "대여자"
                              : column.id === "project"
                                ? "현장"
                                : column.id === "borrowDate"
                                  ? "대여일"
                                  : column.id === "returnDate"
                                    ? "반납예정일"
                                    : column.id === "condition"
                                      ? "상태"
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

