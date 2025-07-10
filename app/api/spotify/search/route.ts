import { type NextRequest, NextResponse } from "next/server"
import { searchTracks, getClientCredentialsToken } from "@/lib/spotify"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Get access token
    const accessToken = await getClientCredentialsToken()

    // Search tracks
    const tracks = await searchTracks(query, accessToken, limit)

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error("Error searching tracks:", error)
    return NextResponse.json({ error: "Failed to search tracks" }, { status: 500 })
  }
}
