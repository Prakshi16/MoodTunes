/**
 * Recent change 🟢
 * 1. Added `export const runtime = "nodejs"` as the first statement
 *    so this handler executes in the Node.js runtime (Buffer is defined there).
 */

export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import { getRecommendations, getMoodAudioFeatures, getClientCredentialsToken } from "@/lib/spotify"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mood, genres = [], artists = [], limit = 20 } = body

    // Retrieve an app-level access token via the Client-Credentials flow
    const accessToken = await getClientCredentialsToken()

    // Map the detected mood to desired audio-feature targets
    const { valence, energy, danceability } = getMoodAudioFeatures(mood)

    // Ask Spotify for recommendations
    const tracks = await getRecommendations(
      genres,
      artists,
      [], // seed tracks (not used yet)
      accessToken,
      valence,
      energy,
      danceability,
      limit,
    )

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error("Error getting recommendations:", error)
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 })
  }
}
