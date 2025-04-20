import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Instead of fetching from other API routes, return mock data directly
    const mockData = [
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

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching all news data:", error)
    return NextResponse.json({ error: "Failed to fetch news data" }, { status: 500 })
  }
}
