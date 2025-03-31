import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const stockItems = [
  {
    name: "LG 하우시스 필름 (화이트)",
    stock: 12,
    minimum: 20,
    unit: "롤",
    urgent: true,
  },
  {
    name: "타일 접착제 (20kg)",
    stock: 8,
    minimum: 15,
    unit: "포대",
    urgent: true,
  },
  {
    name: "천장 몰딩 (2.4m)",
    stock: 25,
    minimum: 30,
    unit: "개",
    urgent: false,
  },
  {
    name: "바닥 타일 (600x600)",
    stock: 120,
    minimum: 200,
    unit: "장",
    urgent: true,
  },
  {
    name: "실리콘 (투명)",
    stock: 18,
    minimum: 30,
    unit: "개",
    urgent: false,
  },
]

export function StockLevels() {
  return (
    <div className="space-y-4">
      {stockItems.map((item) => (
        <div key={item.name} className="flex items-center">
          <div className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              {item.urgent && (
                <Badge variant="destructive" className="ml-2">
                  긴급
                </Badge>
              )}
            </div>
            <div className="flex w-full items-center gap-2">
              <Progress
                value={(item.stock / item.minimum) * 100}
                className="h-2"
                indicatorClassName={
                  item.stock < item.minimum / 2
                    ? "bg-destructive"
                    : item.stock < item.minimum
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }
              />
              <span className="w-12 text-sm tabular-nums text-muted-foreground">
                {item.stock}/{item.minimum} {item.unit}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

