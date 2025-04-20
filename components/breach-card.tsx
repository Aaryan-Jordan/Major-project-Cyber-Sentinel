"use client"

import { Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface BreachCardProps {
  breach: {
    leak: string
    password?: string
  }
}

export function BreachCard({ breach }: BreachCardProps) {
  // Determine severity based on password presence
  const severity = breach.password && breach.password.length > 0 ? "High" : "Low"

  // Extract breach name (before the colon if it exists)
  let breachName = breach.leak
  if (breachName.includes(":")) {
    breachName = breachName.split(":")[0].trim()
  }

  // Format breach name to be more readable
  const formatBreachName = (name: string) => {
    // If it's a URL, extract the domain
    if (name.includes("http")) {
      try {
        const url = new URL(name)
        return url.hostname.replace("www.", "")
      } catch {
        // If URL parsing fails, just return the name
        return name
      }
    }
    return name
  }

  const displayName = formatBreachName(breachName)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${breach.leak}: ${breach.password || "No password exposed"}`)
    toast({
      title: "Copied to clipboard",
      description: "Breach details copied to clipboard",
    })
  }

  return (
    <Card
      className={`border-l-4 ${severity === "High" ? "border-l-red-500" : "border-l-amber-500"} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <CardHeader className="flex flex-row items-start justify-between p-4 pb-0">
        <div>
          <CardTitle className="text-base font-bold">{displayName}</CardTitle>
          <p className="text-xs text-muted-foreground">Breach detected</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy details</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Compromised data:</span> Email,
            {breach.password ? " Password" : " Username"}, Personal Info
          </p>
          <p>
            <span className="font-medium">Password exposed:</span>
            {breach.password ? " Yes (hidden for security)" : " No"}
          </p>
          <p>
            <span className="font-medium">Breach date:</span> {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant={severity === "High" ? "destructive" : "warning"} className="text-xs">
            {severity} Severity
          </Badge>
          <a
            href="https://haveibeenpwned.com/API/v2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Leak API
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
