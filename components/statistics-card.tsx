"use client"

import { Card } from "@/components/ui/card"

export default function StatisticsCard({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string
  value: string
  icon: string
  highlight?: boolean
}) {
  return (
    <Card
      className={`p-6 transition-all duration-300 ${
        highlight ? "border-2 border-success bg-success/10" : "border border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className={`mt-2 text-4xl font-bold ${highlight ? "text-success" : "text-foreground"}`}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </Card>
  )
}
