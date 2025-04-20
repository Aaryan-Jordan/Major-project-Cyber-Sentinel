import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const query = url.searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
  }

  try {
    // Instead of using the external API, return mock data
    const mockData = []

    // Generate some mock breach data based on the query
    // This simulates finding breaches for common domains or patterns
    if (query.includes("admin") || query.includes("test") || query.includes("user")) {
      mockData.push({
        leak: "Adobe",
        password: "********",
      })
    }

    if (query.includes("gmail.com") || query.includes("yahoo.com") || query.includes("hotmail.com")) {
      mockData.push({
        leak: "LinkedIn",
        password: "",
      })

      mockData.push({
        leak: "Dropbox",
        password: "********",
      })
    }

    // Add a random breach for demonstration
    if (Math.random() > 0.5) {
      mockData.push({
        leak: "MyFitnessPal",
        password: "",
      })
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error checking credentials:", error)
    return NextResponse.json({ error: "Failed to connect to API service" }, { status: 500 })
  }
}
