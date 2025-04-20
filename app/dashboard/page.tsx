"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield, Search, RefreshCw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ThreatMeter } from "@/components/threat-meter"
import { BreachCard } from "@/components/breach-card"
import { GlobalStatsCard } from "@/components/global-stats-card"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<string>("-")
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [threatCount, setThreatCount] = useState(0)
  const [darkwebCount, setDarkwebCount] = useState(0)
  const [breachCount, setBreachCount] = useState(0)
  const [breachData, setBreachData] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [globalStats, setGlobalStats] = useState([
    {
      title: "Active Threats",
      value: 0,
      icon: "🔍",
      description: "Worldwide today",
      color: "text-red-500",
      maxValue: 1500,
    },
    {
      title: "Breached Accounts",
      value: 0,
      icon: "🔐",
      description: "In the last 24 hours",
      color: "text-amber-500",
      maxValue: 15000000,
    },
    {
      title: "Vulnerabilities",
      value: 0,
      icon: "🛡️",
      description: "Discovered this week",
      color: "text-blue-500",
      maxValue: 6000,
    },
    {
      title: "Attacks Blocked",
      value: 0,
      icon: "🚫",
      description: "In the last 24 hours",
      color: "text-green-500",
      maxValue: 1500000,
    },
  ])

  // Fetch all data
  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      await fetchLiveThreats()
      await fetchDarkwebThreats()
      updateLastRefreshTime()
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update last refresh time
  const updateLastRefreshTime = () => {
    const now = new Date()
    setLastRefresh(now.toLocaleTimeString())
  }

  // Fetch live threats
  const fetchLiveThreats = async () => {
    try {
      const res = await fetch("/api/live")
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()

      // Check if data is an array before filtering
      if (Array.isArray(data)) {
        const count = data.filter((item: any) => item.status === "Threat").length
        setThreatCount(count)
      } else {
        console.error("Live threats data is not an array:", data)
        setThreatCount(0)
      }
      return data
    } catch (error) {
      console.error("Error fetching live threats:", error)
      // Return empty array to prevent further errors
      return []
    }
  }

  // Fetch darkweb threats
  const fetchDarkwebThreats = async () => {
    try {
      const res = await fetch("/api/darkweb")
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }
      const data = await res.json()

      // Check if data is an array before filtering
      if (Array.isArray(data)) {
        const count = data.filter((item: any) => item.status === "Threat").length
        setDarkwebCount(count)
      } else {
        console.error("Darkweb threats data is not an array:", data)
        setDarkwebCount(0)
      }
      return data
    } catch (error) {
      console.error("Error fetching darkweb threats:", error)
      // Return empty array to prevent further errors
      return []
    }
  }

  // Check credentials
  const checkCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchError(null)
    setBreachData([])

    try {
      const res = await fetch(`/api/hibp-check?query=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()

      if (data.error) {
        setSearchError(data.error)
        setBreachData([])
        setBreachCount(0)
      } else {
        setBreachData(data)
        setBreachCount(data.length)

        // Update the global stats to reflect the search
        if (data.length > 0) {
          // Increment the threat count if breaches were found
          setThreatCount((prev) => prev + 1)
        }
      }
    } catch (error) {
      console.error("Error checking credentials:", error)
      setSearchError("Failed to check credentials. Please try again.")
      setBreachData([])
      setBreachCount(0)
    } finally {
      setIsSearching(false)
    }
  }

  // Toggle auto refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
  }

  // Initialize global stats based on time of day
  const initializeGlobalStats = () => {
    const now = new Date()
    const startOfDay = new Date(now)
    startOfDay.setHours(0, 0, 0, 0)

    // Calculate how far we are into the day (0-1)
    const dayProgress = (now.getTime() - startOfDay.getTime()) / (24 * 60 * 60 * 1000)

    // Update each stat based on day progress
    setGlobalStats((prevStats) =>
      prevStats.map((stat) => ({
        ...stat,
        value: Math.floor(stat.maxValue * dayProgress) + Math.floor(Math.random() * 100),
      })),
    )
  }

  // Gradually increase global stats
  const incrementGlobalStats = () => {
    setGlobalStats((prevStats) =>
      prevStats.map((stat) => {
        // Calculate how much to increment based on max value
        // Higher values increment faster
        const incrementAmount = Math.max(1, Math.floor(stat.maxValue * 0.0001))

        // Add a small random factor
        const randomFactor = Math.floor(Math.random() * incrementAmount)

        // Ensure we don't exceed the max value for the day
        const newValue = Math.min(stat.maxValue, stat.value + incrementAmount + randomFactor)

        return {
          ...stat,
          value: newValue,
        }
      }),
    )
  }

  // Check if it's a new day and reset stats if needed
  const checkAndResetStats = () => {
    const now = new Date()
    const lastResetStr = localStorage.getItem("lastStatsReset")

    if (lastResetStr) {
      const lastReset = new Date(lastResetStr)
      const isNewDay =
        now.getDate() !== lastReset.getDate() ||
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear()

      if (isNewDay) {
        // Reset stats for the new day
        setGlobalStats((prevStats) =>
          prevStats.map((stat) => ({
            ...stat,
            value: Math.floor(Math.random() * 100), // Start with a small random value
          })),
        )
        localStorage.setItem("lastStatsReset", now.toISOString())
      }
    } else {
      // First time running, set the reset date
      localStorage.setItem("lastStatsReset", now.toISOString())
    }
  }

  // Initialize dashboard
  useEffect(() => {
    fetchAllData()
    checkAndResetStats()
    initializeGlobalStats()

    // Set up auto refresh for data
    let dataInterval: NodeJS.Timeout
    if (autoRefresh) {
      dataInterval = setInterval(fetchAllData, 120000) // 2 minutes
    }

    // Set up interval to increment global stats
    const statsInterval = setInterval(incrementGlobalStats, 30000) // 30 seconds

    return () => {
      if (dataInterval) clearInterval(dataInterval)
      clearInterval(statsInterval)
    }
  }, [autoRefresh])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-bold">Cyber Sentinel</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/news"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                News
              </Link>
              <ModeToggle />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container py-8">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-primary">Cyber Threat Dashboard</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Monitor live cybersecurity threats, check for data breaches, and track dark web activity.
            </p>
          </div>

          {/* Credential breach checker */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">
                Credential Breach Check
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Check if your email or username has been exposed in a data breach</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={toggleAutoRefresh} />
                  <Label htmlFor="auto-refresh" className="text-xs text-muted-foreground">
                    Auto-refresh: {autoRefresh ? "ON" : "OFF"}
                  </Label>
                </div>
                <Button variant="outline" size="sm" onClick={fetchAllData} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Summary banner */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Threats</p>
                      <ThreatMeter value={threatCount} maxValue={10} className="my-2" />
                      <p className="text-3xl font-bold text-primary">{threatCount}</p>
                    </div>
                    <div className="rounded-full bg-red-500/10 p-3 text-red-500">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">From news sources</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Dark Web Threats</p>
                      <ThreatMeter value={darkwebCount} maxValue={10} className="my-2" />
                      <p className="text-3xl font-bold text-primary">{darkwebCount}</p>
                    </div>
                    <div className="rounded-full bg-amber-500/10 p-3 text-amber-500">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Detected today</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Breaches Found</p>
                      <ThreatMeter value={breachCount} maxValue={10} className="my-2" />
                      <p className="text-3xl font-bold text-primary">{breachCount}</p>
                    </div>
                    <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">For searched credentials</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <form onSubmit={checkCredentials} className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter email, username, or phone number"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Check</Button>
                </form>

                <div className="mt-6">
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      <p className="text-muted-foreground">Searching for breaches...</p>
                    </div>
                  ) : searchError ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 rounded-full bg-red-500/10 p-4 text-red-500">
                        <Shield className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Error</h3>
                      <p className="mt-2 text-muted-foreground">{searchError}</p>
                    </div>
                  ) : breachData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {breachData.map((breach, index) => (
                        <BreachCard key={index} breach={breach} />
                      ))}
                    </div>
                  ) : breachCount === 0 && searchQuery ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 rounded-full bg-green-500/10 p-4 text-green-500">
                        <Shield className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Good news!</h3>
                      <p className="mt-2 text-muted-foreground">No breaches found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 rounded-full bg-muted/50 p-4 text-muted-foreground">
                        <Search className="h-8 w-8" />
                      </div>
                      <p className="text-muted-foreground">Enter credentials to check for breaches</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Global stats */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Global Cybersecurity Statistics</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Global statistics updated daily and increase throughout the day</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {globalStats.map((stat, index) => (
                <GlobalStatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  color={stat.color}
                />
              ))}
            </div>
          </div>

          {/* Last updated info */}
          <div className="mt-8 flex items-center justify-center text-center text-sm text-muted-foreground">
            <p>
              Last updated: <span className="font-medium text-foreground">{lastRefresh}</span> | Visit the{" "}
              <Link href="/news" className="text-primary hover:underline">
                News page
              </Link>{" "}
              for the latest cybersecurity updates
            </p>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
