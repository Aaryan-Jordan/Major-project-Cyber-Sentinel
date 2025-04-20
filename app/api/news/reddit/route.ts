import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data instead of fetching from Reddit
    const mockData = [
      {
        source: "Reddit",
        title: "New Malware Campaign Using Fake Software Updates",
        url: "https://www.reddit.com/r/cybersecurity/",
        imageUrl:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Malware",
        date: new Date().toISOString(),
        excerpt:
          "Users are reporting a new malware campaign that uses fake software update notifications to trick users into installing malicious software.",
        upvotes: 342,
        comments: 56,
      },
      {
        source: "Reddit",
        title: "How to Protect Against the Latest Ransomware Attacks?",
        url: "https://www.reddit.com/r/cybersecurity/",
        imageUrl:
          "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Ransomware",
        date: new Date().toISOString(),
        excerpt:
          "Looking for advice on how to protect my organization against the latest ransomware attacks targeting our industry.",
        upvotes: 128,
        comments: 42,
      },
      {
        source: "Reddit",
        title: "Security Implications of the New Windows Update",
        url: "https://www.reddit.com/r/cybersecurity/",
        imageUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Security",
        date: new Date().toISOString(),
        excerpt:
          "Discussion about the security implications and potential vulnerabilities in the latest Windows update released this week.",
        upvotes: 215,
        comments: 78,
      },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching Reddit data:", error)
    return NextResponse.json({ error: "Failed to fetch Reddit data" }, { status: 500 })
  }
}
