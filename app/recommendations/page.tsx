"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Heart, Share2, Download, RefreshCw, Music, ExternalLink } from "lucide-react"
import type { SpotifyTrack } from "@/lib/spotify"

export default function RecommendationsPage() {
  // ===== STATE MANAGEMENT =====
  const [recommendations, setRecommendations] = useState<SpotifyTrack[]>([])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [likedSongs, setLikedSongs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  // ===== LOADING AND DATA FETCHING =====
  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate mood detection from uploaded images
      const detectedMood = "happy" // This would come from image analysis

      const response = await fetch("/api/spotify/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: detectedMood,
          genres: ["pop", "indie", "electronic"],
          artists: [], // Could be populated from user preferences
          limit: 20,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      const data = await response.json()
      setRecommendations(data.tracks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // ===== INTERACTION HANDLERS =====
  // Toggle play/pause for song preview
  const togglePlay = async (track: SpotifyTrack) => {
    if (!track.preview_url) {
      // If no preview available, open Spotify
      window.open(track.external_urls.spotify, "_blank")
      return
    }

    if (currentlyPlaying === track.id) {
      // Pause current track
      if (currentAudio) {
        currentAudio.pause()
        setCurrentAudio(null)
      }
      setCurrentlyPlaying(null)
    } else {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause()
      }

      // Play new track
      const audio = new Audio(track.preview_url)
      audio.play()

      audio.onended = () => {
        setCurrentlyPlaying(null)
        setCurrentAudio(null)
      }

      setCurrentAudio(audio)
      setCurrentlyPlaying(track.id)
    }
  }

  // Toggle like status for songs
  const toggleLike = (trackId: string) => {
    setLikedSongs((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]))
  }

  // ===== UTILITY FUNCTIONS =====
  // Get color class based on mood type
  const getMoodColor = (popularity: number) => {
    if (popularity >= 80) return "bg-green-500"
    if (popularity >= 60) return "bg-yellow-500"
    if (popularity >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  // Format duration from milliseconds to mm:ss
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          {/* Loading spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>

          {/* Loading messages */}
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Photos</h2>
          <p className="text-purple-200">Finding the perfect soundtrack for your moment...</p>
        </div>
      </div>
    )
  }

  // ===== ERROR STATE =====
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-purple-200 mb-4">{error}</p>
          <Button onClick={fetchRecommendations} className="bg-gradient-to-r from-indigo-500 to-purple-500">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Indigo floating orb - top left */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>

        {/* Pink floating orb - bottom right */}
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ===== PAGE HEADER SECTION ===== */}
        <div className="text-center mb-8">
          {/* App logo with indigo-pink gradient */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-3 rounded-full">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Page title and description */}
          <h1 className="text-4xl font-bold text-white mb-2">Your Perfect Playlist</h1>
          <p className="text-purple-200">Powered by Spotify - Based on the mood of your photos</p>
        </div>

        {/* ===== MOOD ANALYSIS RESULTS ===== */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white">Detected Mood</CardTitle>
            <CardDescription className="text-purple-200">We analyzed your photos and found these vibes</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mood badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Happy & Energetic</Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Social & Fun</Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Uplifting</Badge>
            </div>
          </CardContent>
        </Card>

        {/* ===== SONG RECOMMENDATIONS GRID ===== */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {recommendations.map((track) => (
            <Card
              key={track.id}
              className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* ===== ALBUM ARTWORK WITH PLAY BUTTON ===== */}
                  <div className="relative">
                    <img
                      src={track.album.images[0]?.url || "/placeholder.svg"}
                      alt={track.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    {/* Play/Pause overlay button */}
                    <button
                      onClick={() => togglePlay(track)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {currentlyPlaying === track.id ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </div>

                  {/* ===== SONG INFORMATION ===== */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{track.name}</h3>
                    <p className="text-purple-200 truncate">{track.artists.map((artist) => artist.name).join(", ")}</p>
                    <p className="text-purple-300 text-sm truncate">{track.album.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getMoodColor(track.popularity)} text-white text-xs`}>
                        {track.popularity}% Popular
                      </Badge>
                      <span className="text-purple-300 text-xs">{formatDuration(track.duration_ms)}</span>
                    </div>
                  </div>

                  {/* ===== ACTION BUTTONS ===== */}
                  <div className="flex flex-col space-y-2">
                    {/* Like/Unlike button */}
                    <button
                      onClick={() => toggleLike(track.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedSongs.includes(track.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Share button */}
                    <button
                      onClick={() =>
                        navigator.share?.({
                          title: track.name,
                          url: track.external_urls.spotify,
                        })
                      }
                      className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ===== SPOTIFY INTEGRATION ===== */}
                <div className="mt-4 p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {/* Spotify logo */}
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">
                        {track.preview_url ? "Preview Available" : "Open in Spotify"}
                      </span>
                    </div>

                    {/* Open Spotify button */}
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => window.open(track.external_urls.spotify, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== ACTION BUTTONS SECTION ===== */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Get new recommendations */}
          <Button
            onClick={fetchRecommendations}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Recommendations
          </Button>

          {/* Export playlist */}
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Playlist
          </Button>

          {/* Share results */}
          <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>

        {/* ===== SPOTIFY ATTRIBUTION ===== */}
        <div className="text-center mt-8 text-purple-300 text-sm">
          Powered by <span className="text-green-400 font-semibold">Spotify</span> • Music recommendations based on your
          photo analysis
        </div>
      </div>
    </div>
  )
}
