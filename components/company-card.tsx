import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CompanyCardProps {
  company: {
    name: string
    logo: string
    description: string
    update: string
    date: string
    url?: string
  }
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex h-32 items-center justify-center bg-white p-4">
        <img
          src={company.logo || "/placeholder.svg"}
          alt={`${company.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 text-base font-bold">{company.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-3">{company.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {company.update}
          </Badge>
          <a
            href={company.url || `https://www.google.com/search?q=${encodeURIComponent(company.name)}`}
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
