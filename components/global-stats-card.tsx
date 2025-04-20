import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GlobalStatsCardProps {
  title: string
  value: number
  description: string
  color: string
}

export function GlobalStatsCard({ title, value, description, color }: GlobalStatsCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={cn("my-2 text-3xl font-bold", color)}>{value.toLocaleString()}</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full", color.replace("text-", "bg-"))}
              style={{ width: `${Math.random() * 50 + 50}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
