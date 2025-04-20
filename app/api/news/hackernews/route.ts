import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data instead of fetching from Hacker News
    const mockData = [
      {
        source: "Hacker News",
        title: "Critical Security Flaw Found in Popular JavaScript Library",
        url: "https://news.ycombinator.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Vulnerability",
        date: new Date().toISOString(),
        excerpt:
          "A critical security vulnerability has been discovered in a widely-used JavaScript library that could lead to remote code execution.",
        score: 423,
        comments: 89,
      },
      {
        source: "Hacker News",
        title: "New Open Source Tool for Network Security Analysis",
        url: "https://news.ycombinator.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Security",
        date: new Date().toISOString(),
        excerpt:
          "A new open source tool has been released that helps security professionals analyze network traffic for potential security threats.",
        score: 287,
        comments: 42,
      },
      {
        source: "Hacker News",
        title: "Major Tech Company Suffers Data Breach Affecting Millions",
        url: "https://news.ycombinator.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Breach",
        date: new Date().toISOString(),
        excerpt:
          "A major technology company has disclosed a data breach that has potentially exposed personal information of millions of users.",
        score: 512,
        comments: 124,
      },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching Hacker News data:", error)
    return NextResponse.json({ error: "Failed to fetch Hacker News data" }, { status: 500 })
  }
}
