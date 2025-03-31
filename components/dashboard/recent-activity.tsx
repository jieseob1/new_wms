import { Package, ArrowRight, Hammer, ArrowLeft, AlertTriangle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "출고",
    user: {
      name: "김현장",
      image: "/placeholder.svg?height=32&width=32",
      initials: "김",
    },
    project: "강남 오피스텔 리모델링",
    item: "LG 하우시스 필름 (화이트)",
    quantity: 2,
    unit: "롤",
    time: "10분 전",
    icon: <Package className="h-4 w-4" />,
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    type: "공구대여",
    user: {
      name: "이기사",
      image: "/placeholder.svg?height=32&width=32",
      initials: "이",
    },
    project: "송파 아파트 인테리어",
    item: "전동드릴 세트",
    quantity: 1,
    unit: "세트",
    time: "1시간 전",
    icon: <Hammer className="h-4 w-4" />,
    iconBg: "bg-amber-500",
  },
  {
    id: 3,
    type: "입고",
    user: {
      name: "박관리",
      image: "/placeholder.svg?height=32&width=32",
      initials: "박",
    },
    project: "창고",
    item: "바닥 타일 (600x600)",
    quantity: 200,
    unit: "장",
    time: "3시간 전",
    icon: <ArrowRight className="h-4 w-4" />,
    iconBg: "bg-green-500",
  },
  {
    id: 4,
    type: "공구반납",
    user: {
      name: "최기술",
      image: "/placeholder.svg?height=32&width=32",
      initials: "최",
    },
    project: "마포 카페 시공",
    item: "레이저 레벨기",
    quantity: 1,
    unit: "대",
    time: "5시간 전",
    icon: <ArrowLeft className="h-4 w-4" />,
    iconBg: "bg-purple-500",
  },
  {
    id: 5,
    type: "재고부족",
    user: {
      name: "시스템",
      image: "/placeholder.svg?height=32&width=32",
      initials: "S",
    },
    project: "창고",
    item: "타일 접착제 (20kg)",
    quantity: 8,
    unit: "포대",
    time: "6시간 전",
    icon: <AlertTriangle className="h-4 w-4" />,
    iconBg: "bg-red-500",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className={`${activity.iconBg} mr-4 flex h-9 w-9 items-center justify-center rounded-full text-white`}>
            {activity.icon}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span>님이{" "}
              <span className="font-semibold">{activity.project}</span>에{" "}
              <span className="font-semibold">
                {activity.item} {activity.quantity}
                {activity.unit}
              </span>
              을{" "}
              {activity.type === "출고"
                ? "요청했습니다"
                : activity.type === "공구대여"
                  ? "대여했습니다"
                  : activity.type === "입고"
                    ? "입고했습니다"
                    : activity.type === "공구반납"
                      ? "반납했습니다"
                      : "알림이 발생했습니다"}
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

