import { type NextRequest, NextResponse } from "next/server"
import { getRecommendations, getMoodAudioFeatures, getClientCredentialsToken } from "@/lib/spotify"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mood, genres = [], artists = [], limit = 20 } = body

    // Get access token
    const accessToken = await getClientCredentialsToken()

    // Get audio features based on mood
    const audioFeatures = getMoodAudioFeatures(mood)

    // Get recommendations from Spotify
    const recommendations = await getRecommendations(
      genres,
      artists,
      [], // seed tracks - empty for now
      accessToken,
      audioFeatures.valence,
      audioFeatures.energy,
      audioFeatures.danceability,
      limit,
    )

    return NextResponse.json({ tracks: recommendations })
  } catch (error) {
    console.error("Error getting recommendations:", error)
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 })
  }
}
