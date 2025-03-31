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
import { Progress } from "@/components/ui/progress"

type InventoryItem = {
  id: string
  code: string
  name: string
  category: string
  stock: number
  unit: string
  minStock: number
  location: string
  lastUpdated: string
  status: "정상" | "부족" | "과다" | "유휴"
}

const data: InventoryItem[] = [
  {
    id: "1",
    code: "FLM-LG-W01",
    name: "LG 하우시스 필름 (화이트)",
    category: "필름",
    stock: 12,
    unit: "롤",
    minStock: 20,
    location: "A-1-2",
    lastUpdated: "2023-04-15",
    status: "부족",
  },
  {
    id: "2",
    code: "TIL-FL-600W",
    name: "바닥 타일 (600x600 화이트)",
    category: "타일",
    stock: 120,
    unit: "장",
    minStock: 200,
    location: "B-2-1",
    lastUpdated: "2023-04-10",
    status: "부족",
  },
  {
    id: "3",
    code: "ADH-TIL-20KG",
    name: "타일 접착제 (20kg)",
    category: "접착제",
    stock: 8,
    unit: "포대",
    minStock: 15,
    location: "C-1-3",
    lastUpdated: "2023-04-12",
    status: "부족",
  },
  {
    id: "4",
    code: "MOL-CL-2.4M",
    name: "천장 몰딩 (2.4m)",
    category: "몰딩",
    stock: 25,
    unit: "개",
    minStock: 30,
    location: "D-3-1",
    lastUpdated: "2023-04-08",
    status: "부족",
  },
  {
    id: "5",
    code: "SIL-CLR-300",
    name: "실리콘 (투명)",
    category: "접착제",
    stock: 18,
    unit: "개",
    minStock: 30,
    location: "C-1-4",
    lastUpdated: "2023-04-14",
    status: "부족",
  },
  {
    id: "6",
    code: "FLM-LG-W02",
    name: "LG 하우시스 필름 (우드)",
    category: "필름",
    stock: 28,
    unit: "롤",
    minStock: 15,
    location: "A-1-3",
    lastUpdated: "2023-04-11",
    status: "정상",
  },
  {
    id: "7",
    code: "TIL-FL-600B",
    name: "바닥 타일 (600x600 블랙)",
    category: "타일",
    stock: 85,
    unit: "장",
    minStock: 100,
    location: "B-2-2",
    lastUpdated: "2023-04-09",
    status: "부족",
  },
  {
    id: "8",
    code: "PNT-INT-18L",
    name: "내부용 페인트 (화이트 18L)",
    category: "페인트",
    stock: 12,
    unit: "통",
    minStock: 8,
    location: "E-1-1",
    lastUpdated: "2023-04-13",
    status: "정상",
  },
  {
    id: "9",
    code: "MOL-FL-2.4M",
    name: "바닥 몰딩 (2.4m)",
    category: "몰딩",
    stock: 42,
    unit: "개",
    minStock: 25,
    location: "D-3-2",
    lastUpdated: "2023-04-07",
    status: "과다",
  },
  {
    id: "10",
    code: "SIL-WHT-300",
    name: "실리콘 (화이트)",
    category: "접착제",
    stock: 32,
    unit: "개",
    minStock: 20,
    location: "C-1-5",
    lastUpdated: "2023-04-06",
    status: "과다",
  },
]

export const columns: ColumnDef<InventoryItem>[] = [
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
          자재명
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
    accessorKey: "stock",
    header: "재고량",
    cell: ({ row }) => {
      const stock = Number.parseFloat(row.getValue("stock"))
      const minStock = Number.parseFloat(row.original.minStock)
      const percentage = (stock / minStock) * 100

      return (
        <div className="flex items-center gap-2">
          <Progress
            value={percentage}
            className="h-2 w-24"
            indicatorClassName={
              percentage < 50 ? "bg-destructive" : percentage < 100 ? "bg-amber-500" : "bg-emerald-500"
            }
          />
          <span>
            {stock} {row.original.unit}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "minStock",
    header: "최소수량",
    cell: ({ row }) => (
      <div>
        {row.getValue("minStock")} {row.original.unit}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "위치",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "정상"
              ? "outline"
              : status === "부족"
                ? "destructive"
                : status === "과다"
                  ? "secondary"
                  : "default"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "최종 업데이트",
    cell: ({ row }) => <div>{row.getValue("lastUpdated")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>자재 정보 보기</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>입고 처리</DropdownMenuItem>
            <DropdownMenuItem>출고 처리</DropdownMenuItem>
            <DropdownMenuItem>이동 처리</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>수정</DropdownMenuItem>
            <DropdownMenuItem>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function InventoryTable() {
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
                        ? "자재명"
                        : column.id === "category"
                          ? "분류"
                          : column.id === "stock"
                            ? "재고량"
                            : column.id === "minStock"
                              ? "최소수량"
                              : column.id === "location"
                                ? "위치"
                                : column.id === "status"
                                  ? "상태"
                                  : column.id === "lastUpdated"
                                    ? "최종 업데이트"
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

