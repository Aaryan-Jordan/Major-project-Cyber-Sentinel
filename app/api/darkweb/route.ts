import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Instead of trying to connect to the Flask backend, return mock data
    const mockData = [
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
    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching darkweb threats:", error)
    return NextResponse.json({ error: "Failed to connect to backend service" }, { status: 500 })
  }
}
