// ===== SPOTIFY API CONFIGURATION =====
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI =
  process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || "http://localhost:3000/api/auth/callback/spotify"

// ===== SPOTIFY API ENDPOINTS =====
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"

// ===== SPOTIFY SCOPES =====
const SPOTIFY_SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-read-recently-played",
].join(" ")

// ===== TYPES =====
export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{
    id: string
    name: string
  }>
  album: {
    id: string
    name: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
  }
  preview_url: string | null
  external_urls: {
    spotify: string
  }
  duration_ms: number
  popularity: number
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[]
    total: number
  }
}

export interface SpotifyRecommendationsResponse {
  tracks: SpotifyTrack[]
}

// ===== AUTHENTICATION FUNCTIONS =====
export function getSpotifyAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID || "",
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SPOTIFY_SCOPES,
    show_dialog: "true",
  })

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`
}

export async function getSpotifyAccessToken(code: string): Promise<string> {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to get access token")
  }

  const data = await response.json()
  return data.access_token
}

// ===== CLIENT CREDENTIALS FLOW (FOR PUBLIC DATA) =====
export async function getClientCredentialsToken(): Promise<string> {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to get client credentials token")
  }

  const data = await response.json()
  return data.access_token
}

// ===== SPOTIFY API FUNCTIONS =====
export async function searchTracks(query: string, accessToken: string, limit = 20): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    q: query,
    type: "track",
    limit: limit.toString(),
    market: "US",
  })

  const response = await fetch(`${SPOTIFY_API_BASE_URL}/search?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to search tracks")
  }

  const data: SpotifySearchResponse = await response.json()
  return data.tracks.items
}

export async function getRecommendations(
  seedGenres: string[],
  seedArtists: string[],
  seedTracks: string[],
  accessToken: string,
  targetValence?: number,
  targetEnergy?: number,
  targetDanceability?: number,
  limit = 20,
): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    market: "US",
  })

  // Add seed parameters
  if (seedGenres.length > 0) {
    params.append("seed_genres", seedGenres.slice(0, 5).join(","))
  }
  if (seedArtists.length > 0) {
    params.append("seed_artists", seedArtists.slice(0, 5).join(","))
  }
  if (seedTracks.length > 0) {
    params.append("seed_tracks", seedTracks.slice(0, 5).join(","))
  }

  // Add target audio features based on mood
  if (targetValence !== undefined) {
    params.append("target_valence", targetValence.toString())
  }
  if (targetEnergy !== undefined) {
    params.append("target_energy", targetEnergy.toString())
  }
  if (targetDanceability !== undefined) {
    params.append("target_danceability", targetDanceability.toString())
  }

  const response = await fetch(`${SPOTIFY_API_BASE_URL}/recommendations?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get recommendations")
  }

  const data: SpotifyRecommendationsResponse = await response.json()
  return data.tracks
}

export async function getAvailableGenres(accessToken: string): Promise<string[]> {
  const response = await fetch(`${SPOTIFY_API_BASE_URL}/recommendations/available-genre-seeds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get available genres")
  }

  const data = await response.json()
  return data.genres
}

// ===== MOOD TO AUDIO FEATURES MAPPING =====
export function getMoodAudioFeatures(mood: string) {
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

  return moodMap[mood.toLowerCase()] || { valence: 0.5, energy: 0.5, danceability: 0.5 }
}
