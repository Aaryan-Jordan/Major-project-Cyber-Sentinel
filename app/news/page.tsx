"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield, RefreshCw, AlertTriangle, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { DarkwebCard } from "@/components/darkweb-card"
import { CompanyCard } from "@/components/company-card"
import { CertificationCard } from "@/components/certification-card"
import { NewsCarousel } from "@/components/news-carousel"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsItem {
  source: string
  title: string
  url: string
  imageUrl: string
  category: string
  date: string
  excerpt: string
}

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<string>("-")
  const [newsData, setNewsData] = useState<any[]>([])
  const [darkwebData, setDarkwebData] = useState<any[]>([])
  const [companyData, setCompanyData] = useState<any[]>([])
  const [certificationData, setCertificationData] = useState<any[]>([])
  const [scrapedNews, setScrapedNews] = useState<NewsItem[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  // Fetch all data
  const fetchAllData = async () => {
    setIsLoading(true)
    try {
      const [news, darkweb, companies, certifications, scrapedNewsData] = await Promise.all([
        fetchLiveThreats(),
        fetchDarkwebThreats(),
        fetchCompaniesNews(),
        fetchCertificationUpdates(),
        fetchScrapedNews(),
      ])

      setNewsData(news)
      setDarkwebData(darkweb)
      setCompanyData(companies)
      setCertificationData(certifications)
      setScrapedNews(scrapedNewsData)

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
      // Use mock data instead of API call to avoid errors
      return [
        {
          post: "[THN] Critical Vulnerability Found in Popular Router Firmware",
          status: "Threat",
        },
        {
          post: "[BC] New Ransomware Campaign Targeting Healthcare Organizations",
          status: "Threat",
        },
        {
          post: "[SW] Microsoft Patches Zero-Day Vulnerability in Windows",
          status: "Threat",
        },
        {
          post: "[THN] Security Researchers Discover New Method to Protect Against Phishing",
          status: "Safe",
        },
      ]
    } catch (error) {
      console.error("Error fetching live threats:", error)
      return []
    }
  }

  // Fetch darkweb threats
  const fetchDarkwebThreats = async () => {
    try {
      // Use mock data instead of API call to avoid errors
      return [
        {
          post: "Selling credentials from breached enterprise in Asia",
          status: "Threat",
          threat_level: "High",
          time: new Date().toLocaleTimeString(),
        },
        {
          post: "Database dump listed on hidden forum: includes PII",
          status: "Threat",
          threat_level: "Medium",
          time: new Date().toLocaleTimeString(),
        },
        {
          post: "New exploit kit targeting financial institutions",
          status: "Threat",
          threat_level: "High",
          time: new Date().toLocaleTimeString(),
        },
        {
          post: "Discussion about recent security patch effectiveness",
          status: "Safe",
          threat_level: "-",
          time: new Date().toLocaleTimeString(),
        },
      ]
    } catch (error) {
      console.error("Error fetching darkweb threats:", error)
      return []
    }
  }

  // Fetch scraped news
  const fetchScrapedNews = async () => {
    try {
      // Use mock data instead of API call to avoid errors
      return [
        {
          source: "The Hacker News",
          title: "Critical Vulnerability Found in Popular Router Firmware",
          url: "https://thehackernews.com/",
          imageUrl:
            "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          category: "Vulnerability",
          date: new Date().toISOString(),
          excerpt:
            "Security researchers have discovered a critical vulnerability in popular router firmware that could allow attackers to gain remote access.",
        },
        {
          source: "Bleeping Computer",
          title: "New Ransomware Campaign Targeting Healthcare Organizations",
          url: "https://www.bleepingcomputer.com/",
          imageUrl:
            "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          category: "Ransomware",
          date: new Date().toISOString(),
          excerpt:
            "A new ransomware campaign is specifically targeting healthcare organizations, encrypting patient data and demanding large ransoms.",
        },
        {
          source: "Krebs on Security",
          title: "Major Data Breach Exposes Millions of Customer Records",
          url: "https://krebsonsecurity.com/",
          imageUrl:
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          category: "Breach",
          date: new Date().toISOString(),
          excerpt:
            "A major data breach at a popular online retailer has exposed millions of customer records including names, addresses, and partial payment information.",
        },
        {
          source: "ZDNet",
          title: "New Phishing Campaign Impersonates COVID-19 Vaccine Appointments",
          url: "https://www.zdnet.com/",
          imageUrl:
            "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          category: "Phishing",
          date: new Date().toISOString(),
          excerpt:
            "Cybercriminals are launching sophisticated phishing campaigns impersonating COVID-19 vaccine appointment notifications to steal personal information.",
        },
        {
          source: "Ars Technica",
          title: "Zero-Day Vulnerability in Popular Browser Extension Exploited in the Wild",
          url: "https://arstechnica.com/",
          imageUrl:
            "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          category: "Vulnerability",
          date: new Date().toISOString(),
          excerpt:
            "Security researchers have discovered attackers actively exploiting a zero-day vulnerability in a popular browser extension with millions of users.",
        },
      ]
    } catch (error) {
      console.error("Error fetching scraped news:", error)
      return []
    }
  }

  // Fetch companies news (mock data for now)
  const fetchCompaniesNews = async () => {
    // This would be replaced with actual API call in production
    return [
      {
        name: "CrowdStrike",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/CrowdStrike_logo.svg/1200px-CrowdStrike_logo.svg.png",
        description:
          "CrowdStrike announced a new threat hunting service that uses AI to proactively identify potential breaches before they occur.",
        update: "New AI-powered threat hunting service launched",
        date: "2023-05-15",
        url: "https://www.crowdstrike.com/blog/",
      },
      {
        name: "Palo Alto Networks",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Palo_Alto_Networks_logo.svg/1200px-Palo_Alto_Networks_logo.svg.png",
        description:
          "Palo Alto Networks has acquired cloud security startup Bridgecrew to enhance its Prisma Cloud platform with infrastructure-as-code security.",
        update: "Acquisition of Bridgecrew completed",
        date: "2023-04-22",
        url: "https://www.paloaltonetworks.com/blog",
      },
      {
        name: "Fortinet",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/1200px-Fortinet_logo.svg.png",
        description:
          "Fortinet released FortiOS 7.2 with enhanced ZTNA capabilities and improved SD-WAN performance for remote workers.",
        update: "FortiOS 7.2 released with ZTNA enhancements",
        date: "2023-06-01",
        url: "https://www.fortinet.com/blog",
      },
    ]
  }

  // Fetch certification updates (mock data for now)
  const fetchCertificationUpdates = async () => {
    // This would be replaced with actual API call in production
    return [
      {
        name: "CompTIA Security+",
        provider: "CompTIA",
        image: "https://comptiacdn.azureedge.net/webcontent/images/default-source/siteicons/logosecurity.svg",
        description:
          "CompTIA has updated the Security+ (SY0-601) exam with new objectives covering cloud security and IoT security threats.",
        date: "2023-05-20",
        type: "Update",
        url: "https://www.comptia.org/certifications/security",
      },
      {
        name: "CISSP",
        provider: "ISC²",
        image: "https://www.isc2.org/-/media/ISC2/Landing-Pages/CISSP-Landing/cissp-logo.ashx",
        description:
          "ISC² has announced changes to the CISSP certification with a greater focus on zero trust architecture and cloud security models.",
        date: "2023-04-15",
        type: "Revision",
        url: "https://www.isc2.org/Certifications/CISSP",
      },
      {
        name: "CCNA",
        provider: "Cisco",
        image: "https://www.cisco.com/c/dam/assets/swa/img/anchor-info/ccna-logo-295x144.png",
        description:
          "Cisco has updated the CCNA curriculum to include more content on network automation and programmability.",
        date: "2023-06-05",
        type: "Update",
        url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
      },
    ]
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  // Initialize page
  useEffect(() => {
    fetchAllData()
  }, [])

  // Sort news to prioritize items with valid images and descriptions
  const sortedNews = [...scrapedNews].sort((a, b) => {
    const aHasValidImage = a.imageUrl && !a.imageUrl.includes("placeholder.svg")
    const bHasValidImage = b.imageUrl && !b.imageUrl.includes("placeholder.svg")

    const aHasDescription = a.excerpt && a.excerpt.length > 20
    const bHasDescription = b.excerpt && b.excerpt.length > 20

    // Prioritize items with both valid image and description
    if (aHasValidImage && aHasDescription && (!bHasValidImage || !bHasDescription)) return -1
    if (bHasValidImage && bHasDescription && (!aHasValidImage || !aHasDescription)) return 1

    // Then prioritize items with valid images
    if (aHasValidImage && !bHasValidImage) return -1
    if (bHasValidImage && !aHasValidImage) return 1

    // Then prioritize items with descriptions
    if (aHasDescription && !bHasDescription) return -1
    if (bHasDescription && !aHasDescription) return 1

    // Default to sorting by date (newest first)
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  // Group news by category
  const newsCategories = sortedNews.reduce(
    (acc, item) => {
      const category = item.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, NewsItem[]>,
  )

  // Get news image based on category
  const getNewsImageByCategory = (category: string) => {
    const imageMap: Record<string, string> = {
      Ransomware:
        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      Malware:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      Hack: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      Breach:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      Vulnerability:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      Phishing:
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      Security:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    }

    return (
      imageMap[category] ||
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen w-full bg-background">
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
            <h1 className="text-3xl font-bold text-primary">Cybersecurity News & Updates</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Stay informed with the latest cybersecurity news, dark web threats, company updates, and certification
              changes.
            </p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="font-medium">{lastRefresh}</span>
            </p>
            <Button variant="outline" size="sm" onClick={fetchAllData} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh All
            </Button>
          </div>

          {/* Category Selector */}
          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="featured">Featured News</TabsTrigger>
                <TabsTrigger value="darkweb">Dark Web Threats</TabsTrigger>
                <TabsTrigger value="companies">Company Updates</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* All Categories Section */}
          {activeCategory === "all" && (
            <>
              {/* Featured News */}
              <section className="mb-8">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rss className="h-5 w-5 text-primary" />
                      Featured Cybersecurity News
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        <div className="flex gap-4 overflow-x-auto pb-4">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Card key={i} className="min-w-[300px] overflow-hidden flex-shrink-0">
                              <Skeleton className="h-48 w-full" />
                              <CardContent className="p-4">
                                <Skeleton className="mb-2 h-4 w-24" />
                                <Skeleton className="mb-2 h-6 w-full" />
                                <Skeleton className="mb-4 h-4 w-full" />
                                <div className="flex items-center justify-between">
                                  <Skeleton className="h-4 w-20" />
                                  <Skeleton className="h-4 w-16" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : sortedNews.length > 0 ? (
                      <NewsCarousel title="" news={sortedNews} singleRow={true} />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <AlertTriangle className="mb-2 h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">No news available at the moment</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* News by Category */}
              {Object.entries(newsCategories).length > 0 && (
                <section className="mb-8">
                  <h2 className="mb-6 text-2xl font-bold text-primary">News by Category</h2>
                  <div className="space-y-8">
                    {Object.entries(newsCategories)
                      .filter(([_, items]) => items.length >= 2) // Only show categories with at least 2 items
                      .map(([category, items]) => (
                        <div key={category}>
                          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                              <CardTitle>{category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <NewsCarousel
                                title=""
                                news={items.map((item) => ({
                                  ...item,
                                  imageUrl: getNewsImageByCategory(category),
                                }))}
                                singleRow={true}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                  </div>
                </section>
              )}

              {/* Dark Web Threat Detection */}
              <section className="mb-8">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Dark Web Threat Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : darkwebData.length > 0 ? (
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                        {darkwebData.map((threat, index) => (
                          <div key={index} className="min-w-[300px] flex-shrink-0 snap-start">
                            <DarkwebCard threat={threat} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground">No dark web threats detected</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Cybersecurity Companies and Updates */}
              <section className="mb-8">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Cybersecurity Companies and Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : companyData.length > 0 ? (
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                        {companyData.map((company, index) => (
                          <div key={index} className="min-w-[300px] flex-shrink-0 snap-start">
                            <CompanyCard company={company} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground">No company updates available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Cybersecurity & Networking Certification Updates */}
              <section className="mb-8">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Cybersecurity & Networking Certification Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : certificationData.length > 0 ? (
                      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                        {certificationData.map((cert, index) => (
                          <div key={index} className="min-w-[300px] flex-shrink-0 snap-start">
                            <CertificationCard key={index} certification={cert} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground">No certification updates available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            </>
          )}

          {/* Featured News Section */}
          {activeCategory === "featured" && (
            <section className="mb-8">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rss className="h-5 w-5 text-primary" />
                    Featured Cybersecurity News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Card key={i} className="min-w-[300px] overflow-hidden flex-shrink-0">
                            <Skeleton className="h-48 w-full" />
                            <CardContent className="p-4">
                              <Skeleton className="mb-2 h-4 w-24" />
                              <Skeleton className="mb-2 h-6 w-full" />
                              <Skeleton className="mb-4 h-4 w-full" />
                              <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-16" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : sortedNews.length > 0 ? (
                    <NewsCarousel title="" news={sortedNews} singleRow={true} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AlertTriangle className="mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">No news available at the moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* News by Category */}
              {Object.entries(newsCategories).length > 0 && (
                <div className="mt-8 space-y-8">
                  {Object.entries(newsCategories)
                    .filter(([_, items]) => items.length >= 2) // Only show categories with at least 2 items
                    .map(([category, items]) => (
                      <Card key={category} className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle>{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <NewsCarousel
                            title=""
                            news={items.map((item) => ({
                              ...item,
                              imageUrl: getNewsImageByCategory(category),
                            }))}
                            singleRow={true}
                          />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </section>
          )}

          {/* Dark Web Threat Detection */}
          {activeCategory === "darkweb" && (
            <section>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Dark Web Threat Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : darkwebData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {darkwebData.map((threat, index) => (
                        <DarkwebCard key={index} threat={threat} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No dark web threats detected</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {/* Cybersecurity Companies and Updates */}
          {activeCategory === "companies" && (
            <section>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Cybersecurity Companies and Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : companyData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {companyData.map((company, index) => (
                        <CompanyCard key={index} company={company} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No company updates available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {/* Cybersecurity & Networking Certification Updates */}
          {activeCategory === "certifications" && (
            <section>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Cybersecurity & Networking Certification Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : certificationData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {certificationData.map((cert, index) => (
                        <CertificationCard key={index} certification={cert} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No certification updates available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}
