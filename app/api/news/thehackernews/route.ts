import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data instead of scraping The Hacker News
    const mockData = [
      {
        source: "The Hacker News",
        title: "New Ransomware Variant Targets Critical Infrastructure",
        url: "https://thehackernews.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Ransomware",
        date: new Date().toISOString(),
        excerpt:
          "Security researchers have identified a new ransomware variant specifically targeting critical infrastructure organizations.",
      },
      {
        source: "The Hacker News",
        title: "Critical Vulnerability in Popular VPN Service Exposes User Data",
        url: "https://thehackernews.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Vulnerability",
        date: new Date().toISOString(),
        excerpt:
          "A critical vulnerability discovered in a popular VPN service could expose user data and browsing history to attackers.",
      },
      {
        source: "The Hacker News",
        title: "New Phishing Campaign Uses AI-Generated Content to Evade Detection",
        url: "https://thehackernews.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Phishing",
        date: new Date().toISOString(),
        excerpt:
          "Cybercriminals are using AI-generated content in phishing emails to evade traditional security filters and detection mechanisms.",
      },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching The Hacker News data:", error)
    return NextResponse.json({ error: "Failed to fetch The Hacker News data" }, { status: 500 })
  }
}
