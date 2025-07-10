/**
 * Recent change 🟢
 * 1. Added `export const runtime = "nodejs"` as the first statement
 *    so this handler executes in the Node.js runtime (Buffer is defined there).
 */

export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { getClientCredentialsToken } from "@/lib/spotify"

export async function GET() {
  try {
    const accessToken = await getClientCredentialsToken()

    return NextResponse.json({
      access_token: accessToken,
      expires_in: 3600, // 1 hour
    })
  } catch (error) {
    console.error("Error getting Spotify token:", error)
    return NextResponse.json({ error: "Failed to get Spotify access token" }, { status: 500 })
  }
}
