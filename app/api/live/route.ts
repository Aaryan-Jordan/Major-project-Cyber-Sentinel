import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Instead of trying to connect to the Flask backend, return mock data
    const mockData = [
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
    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching live threats:", error)
    return NextResponse.json({ error: "Failed to connect to backend service" }, { status: 500 })
  }
}
