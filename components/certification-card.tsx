import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CertificationCardProps {
  certification: {
    name: string
    provider: string
    image: string
    description: string
    date: string
    type: string
    url?: string
  }
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card className="overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex h-32 items-center justify-center bg-white p-4">
        <img
          src={certification.image || "/placeholder.svg"}
          alt={`${certification.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-1 text-xs font-medium text-primary">{certification.provider}</div>
        <h3 className="mb-1 text-base font-bold">{certification.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{certification.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {certification.type}
          </Badge>
          <a
            href={
              certification.url ||
              `https://www.google.com/search?q=${encodeURIComponent(certification.name + " " + certification.provider)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary/80"
          >
            Read more
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
