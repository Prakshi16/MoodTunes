export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mood, genres = [], artists = [], limit = 20 } = body

    // Get Spotify access token using Client Credentials flow
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    })

    if (!tokenResponse.ok) {
      console.error("Token response:", await tokenResponse.text())
      throw new Error("Failed to get Spotify access token")
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Map mood to audio features
    const moodMap: Record<string, { valence: number; energy: number; danceability: number }> = {
      happy: { valence: 0.8, energy: 0.7, danceability: 0.7 },
      sad: { valence: 0.2, energy: 0.3, danceability: 0.3 },
      energetic: { valence: 0.7, energy: 0.9, danceability: 0.8 },
      calm: { valence: 0.5, energy: 0.2, danceability: 0.3 },
      romantic: { valence: 0.6, energy: 0.4, danceability: 0.5 },
      party: { valence: 0.9, energy: 0.9, danceability: 0.9 },
      chill: { valence: 0.4, energy: 0.3, danceability: 0.4 },
      upbeat: { valence: 0.8, energy: 0.8, danceability: 0.8 },
    }

    const audioFeatures = moodMap[mood.toLowerCase()] || { valence: 0.5, energy: 0.5, danceability: 0.5 }

    // Get recommendations from Spotify
    const params = new URLSearchParams({
      limit: limit.toString(),
      market: "US",
      seed_genres: genres.slice(0, 5).join(",") || "pop,rock,indie",
      target_valence: audioFeatures.valence.toString(),
      target_energy: audioFeatures.energy.toString(),
      target_danceability: audioFeatures.danceability.toString(),
    })

    const recommendationsResponse = await fetch(`https://api.spotify.com/v1/recommendations?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!recommendationsResponse.ok) {
      console.error("Recommendations response:", await recommendationsResponse.text())
      throw new Error("Failed to get recommendations from Spotify")
    }

    const recommendationsData = await recommendationsResponse.json()

    return NextResponse.json({ tracks: recommendationsData.tracks })
  } catch (error) {
    console.error("Error getting recommendations:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get recommendations" },
      { status: 500 },
    )
  }
}
