import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { Plus, FileDown, FileUp, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "재고 관리 | 인테리어 자재 관리 시스템",
  description: "인테리어 자재 재고 관리",
}

export default function InventoryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">재고 관리</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <FileUp className="mr-2 h-4 w-4" />
            엑셀 가져오기
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            엑셀 내보내기
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            신규 자재 등록
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="자재명, 코드, 위치 등으로 검색..." className="pl-8" />
        </div>
      </div>
      <InventoryTable />
    </div>
  )
}

