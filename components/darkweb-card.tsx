"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface DarkwebCardProps {
  threat: {
    post: string
    status: string
    threat_level: string
    time: string
  }
}

export function DarkwebCard({ threat }: DarkwebCardProps) {
  const isThreat = threat.status === "Threat"

  const getBadgeVariant = () => {
    if (!isThreat) return "secondary"
    if (threat.threat_level === "High") return "destructive"
    if (threat.threat_level === "Medium") return "warning"
    return "default"
  }

  const getBadgeText = () => {
    if (!isThreat) return "Safe"
    return `${threat.threat_level} Threat`
  }

  const getBorderColor = () => {
    if (!isThreat) return "border-l-green-500"
    if (threat.threat_level === "High") return "border-l-red-500"
    if (threat.threat_level === "Medium") return "border-l-amber-500"
    return "border-l-blue-500"
  }

  return (
    <Card
      className={`border-l-4 ${getBorderColor()} bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <CardContent className="p-4">
        <div className="mb-4 font-mono text-sm">{threat.post}</div>
        <div className="flex items-center justify-between">
          <Badge variant={getBadgeVariant()} className="text-xs">
            {getBadgeText()}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{threat.time}</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert(`Detailed analysis for threat: ${threat.post}`)
              }}
              className="text-xs text-primary hover:text-primary/80"
            >
              View Details
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
