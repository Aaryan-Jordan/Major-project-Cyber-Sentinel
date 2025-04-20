import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data instead of scraping Bleeping Computer
    const mockData = [
      {
        source: "BleepingComputer",
        title: "New Banking Trojan Steals Credentials Through Fake Login Pages",
        url: "https://www.bleepingcomputer.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Malware",
        date: new Date().toISOString(),
        excerpt:
          "A new banking trojan has been discovered that creates convincing fake login pages to steal credentials from unsuspecting users.",
      },
      {
        source: "BleepingComputer",
        title: "Critical Windows Security Update Patches Zero-Day Vulnerability",
        url: "https://www.bleepingcomputer.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Vulnerability",
        date: new Date().toISOString(),
        excerpt:
          "Microsoft has released an emergency security update to patch a zero-day vulnerability that was being actively exploited in the wild.",
      },
      {
        source: "BleepingComputer",
        title: "Healthcare Provider Suffers Ransomware Attack Affecting Patient Data",
        url: "https://www.bleepingcomputer.com/",
        imageUrl:
          "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        category: "Ransomware",
        date: new Date().toISOString(),
        excerpt:
          "A major healthcare provider has disclosed a ransomware attack that potentially compromised sensitive patient data and medical records.",
      },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching BleepingComputer data:", error)
    return NextResponse.json({ error: "Failed to fetch BleepingComputer data" }, { status: 500 })
  }
}
