import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDown, Printer, Calendar } from "lucide-react"
import { ReportsList } from "@/components/reports/reports-list"
import { DateRangePicker } from "@/components/reports/date-range-picker"

export const metadata: Metadata = {
  title: "보고서 | 인테리어 자재 관리 시스템",
  description: "인테리어 자재 및 공구 관련 보고서",
}

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">보고서</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button>
            <Printer className="mr-2 h-4 w-4" />
            인쇄
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            PDF 저장
          </Button>
        </div>
      </div>
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">재고 보고서</TabsTrigger>
          <TabsTrigger value="projects">현장 보고서</TabsTrigger>
          <TabsTrigger value="tools">공구 보고서</TabsTrigger>
          <TabsTrigger value="custom">맞춤 보고서</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 자재 종류</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 자재 가치</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩ 24,350,000</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">재고 부족 항목</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">유휴 재고 항목</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
          </div>
          <ReportsList type="inventory" />
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 현장 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">진행 중인 현장</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">현장별 평균 자재 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">현장별 평균 공구 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>
          </div>
          <ReportsList type="projects" />
        </TabsContent>
        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 공구 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">대여 중인 공구</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">수리 중인 공구</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">분실된 공구</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
              </CardContent>
            </Card>
          </div>
          <ReportsList type="tools" />
        </TabsContent>
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>맞춤 보고서 생성</CardTitle>
              <CardDescription>필요한 데이터와 형식을 선택하여 맞춤형 보고서를 생성하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">보고서 유형</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="inventory">재고 현황</option>
                    <option value="movement">자재 이동 내역</option>
                    <option value="project">현장별 자재 사용</option>
                    <option value="tools">공구 대여 현황</option>
                    <option value="cost">비용 분석</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">기간 선택</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2023-04-01 ~ 2023-04-30</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">포함할 데이터</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-1" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="data-1" className="text-sm">
                      자재 코드
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-2" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="data-2" className="text-sm">
                      자재명
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-3" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="data-3" className="text-sm">
                      수량
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-4" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="data-4" className="text-sm">
                      단가
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-5" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="data-5" className="text-sm">
                      총액
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-6" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="data-6" className="text-sm">
                      위치
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-7" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="data-7" className="text-sm">
                      담당자
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="data-8" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="data-8" className="text-sm">
                      날짜
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">출력 형식</label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="format-1" name="format" className="h-4 w-4" defaultChecked />
                    <label htmlFor="format-1" className="text-sm">
                      PDF
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="format-2" name="format" className="h-4 w-4" />
                    <label htmlFor="format-2" className="text-sm">
                      Excel
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="format-3" name="format" className="h-4 w-4" />
                    <label htmlFor="format-3" className="text-sm">
                      CSV
                    </label>
                  </div>
                </div>
              </div>
              <Button className="w-full">보고서 생성</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

