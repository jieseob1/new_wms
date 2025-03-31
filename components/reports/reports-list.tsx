"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDown, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

type ReportType = "inventory" | "projects" | "tools"

interface ReportsListProps {
  type: ReportType
}

interface Report {
  id: string
  title: string
  description: string
  date: string
  icon: React.ReactNode
}

const inventoryReports: Report[] = [
  {
    id: "inv-1",
    title: "월간 재고 현황 보고서",
    description: "모든 자재의 현재 재고 수준과 최소 재고 대비 상태를 보여줍니다.",
    date: "2023-04-01",
    icon: <FileText className="h-8 w-8 text-blue-500" />,
  },
  {
    id: "inv-2",
    title: "재고 부족 알림 보고서",
    description: "최소 재고 수준 이하로 떨어진 자재 목록과 발주 권장 수량을 제공합니다.",
    date: "2023-04-15",
    icon: <FileText className="h-8 w-8 text-red-500" />,
  },
  {
    id: "inv-3",
    title: "자재 이동 내역 보고서",
    description: "지난 달 모든 자재의 입고, 출고, 이동 내역을 시간순으로 보여줍니다.",
    date: "2023-04-01",
    icon: <FileText className="h-8 w-8 text-green-500" />,
  },
  {
    id: "inv-4",
    title: "자재 사용량 분석",
    description: "자재별, 현장별 사용량을 분석하여 소비 패턴과 추세를 보여줍니다.",
    date: "2023-04-01",
    icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
  },
]

const projectsReports: Report[] = [
  {
    id: "prj-1",
    title: "현장별 자재 사용 보고서",
    description: "각 현장에서 사용된 자재의 종류와 수량을 상세히 보여줍니다.",
    date: "2023-04-01",
    icon: <FileText className="h-8 w-8 text-blue-500" />,
  },
  {
    id: "prj-2",
    title: "현장 진행 상황 보고서",
    description: "각 현장의 진행 상태와 예상 완료일을 보여줍니다.",
    date: "2023-04-15",
    icon: <FileText className="h-8 w-8 text-amber-500" />,
  },
  {
    id: "prj-3",
    title: "현장별 비용 분석",
    description: "각 현장에서 사용된 자재와 공구의 비용을 분석합니다.",
    date: "2023-04-01",
    icon: <BarChart3 className="h-8 w-8 text-green-500" />,
  },
]

const toolsReports: Report[] = [
  {
    id: "tool-1",
    title: "공구 대여 현황 보고서",
    description: "현재 대여 중인 모든 공구와 반납 예정일을 보여줍니다.",
    date: "2023-04-01",
    icon: <FileText className="h-8 w-8 text-blue-500" />,
  },
  {
    id: "tool-2",
    title: "공구 상태 보고서",
    description: "모든 공구의 현재 상태와 수리가 필요한 공구 목록을 제공합니다.",
    date: "2023-04-15",
    icon: <FileText className="h-8 w-8 text-red-500" />,
  },
  {
    id: "tool-3",
    title: "공구 사용 빈도 분석",
    description: "각 공구의 대여 빈도와 평균 대여 기간을 분석합니다.",
    date: "2023-04-01",
    icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
  },
]

export function ReportsList({ type }: ReportsListProps) {
  const [reports, setReports] = useState<Report[]>(() => {
    switch (type) {
      case "inventory":
        return inventoryReports
      case "projects":
        return projectsReports
      case "tools":
        return toolsReports
      default:
        return []
    }
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.date}</CardDescription>
            </div>
            {report.icon}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                다운로드
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

