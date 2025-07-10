"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Heart, Share2, Download, RefreshCw, Music } from "lucide-react"

// ===== RECENT CHANGE: Updated mock recommendations for Valentine's context =====
// Changed song recommendations to better match Valentine's Day theme mentioned in context
const mockRecommendations = [
  {
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    mood: "Romantic",
    spotifyId: "0tgVpDi06FyKpA1z0VMD4v",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
  {
    id: 2,
    title: "All of Me",
    artist: "John Legend",
    album: "Love in the Future",
    mood: "Intimate",
    spotifyId: "3U4isOIWM3VvDubwSI3y7a",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
  {
    id: 3,
    title: "Lover",
    artist: "Taylor Swift",
    album: "Lover",
    mood: "Sweet",
    spotifyId: "1dGr1c8CrMLDpV6mPbImSI",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
  {
    id: 4,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    album: "x (Multiply)",
    mood: "Tender",
    spotifyId: "lp7eUmSWx6J0qT5iZlsIEQ",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
]

export default function RecommendationsPage() {
  // ===== STATE MANAGEMENT =====
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [likedSongs, setLikedSongs] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  // ===== LOADING SIMULATION =====
  useEffect(() => {
    // Simulate AI processing time for recommendations
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // ===== INTERACTION HANDLERS =====
  // Toggle play/pause for song preview
  const togglePlay = (songId: number) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId)
  }

  // Toggle like status for songs
  const toggleLike = (songId: number) => {
    setLikedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  // ===== UTILITY FUNCTIONS =====
  // Get color class based on mood type
  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "energetic":
        return "bg-red-500"
      case "happy":
        return "bg-yellow-500"
      case "upbeat":
        return "bg-green-500"
      case "chill":
        return "bg-blue-500"
      // RECENT CHANGE: Added romantic mood colors for Valentine's theme
      case "romantic":
        return "bg-pink-500"
      case "intimate":
        return "bg-red-400"
      case "sweet":
        return "bg-rose-400"
      case "tender":
        return "bg-pink-400"
      default:
        return "bg-purple-500"
    }
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
          <p className="text-purple-200">Based on the mood of your photos</p>
        </div>

        {/* ===== MOOD ANALYSIS RESULTS ===== */}
        {/* RECENT CHANGE: Enhanced to show context-aware analysis */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white">AI Analysis Results</CardTitle>
            <CardDescription className="text-purple-200">
              Based on your photos and context: "Valentine's Day dinner"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Visual mood detection */}
              <div>
                <h4 className="text-white font-medium mb-2">📸 Visual Mood Detected:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Happy & Energetic</Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Social & Fun</Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Uplifting</Badge>
                </div>
              </div>

              {/* Context-based recommendations */}
              {/* RECENT CHANGE: New section showing how context influences song selection */}
              <div>
                <h4 className="text-white font-medium mb-2">💝 Context-Enhanced Selection:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white">Romantic</Badge>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Love Songs</Badge>
                  <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white">Intimate</Badge>
                </div>
              </div>

              {/* Combined recommendation approach */}
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-purple-200 text-sm">
                  🎯 <strong className="text-white">Smart Matching:</strong> We combined your visual mood with your
                  Valentine's Day context to curate romantic songs that match your happy, social energy!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== SONG RECOMMENDATIONS GRID ===== */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mockRecommendations.map((song) => (
            <Card
              key={song.id}
              className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* ===== ALBUM ARTWORK WITH PLAY BUTTON ===== */}
                  <div className="relative">
                    <img
                      src={song.image || "/placeholder.svg"}
                      alt={song.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    {/* Play/Pause overlay button */}
                    <button
                      onClick={() => togglePlay(song.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {currentlyPlaying === song.id ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </div>

                  {/* ===== SONG INFORMATION ===== */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{song.title}</h3>
                    <p className="text-purple-200 truncate">{song.artist}</p>
                    <p className="text-purple-300 text-sm truncate">{song.album}</p>
                    <Badge className={`mt-2 ${getMoodColor(song.mood)} text-white text-xs`}>{song.mood}</Badge>
                  </div>

                  {/* ===== ACTION BUTTONS ===== */}
                  <div className="flex flex-col space-y-2">
                    {/* Like/Unlike button */}
                    <button
                      onClick={() => toggleLike(song.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedSongs.includes(song.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Share button */}
                    <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ===== SPOTIFY INTEGRATION PLACEHOLDER ===== */}
                <div className="mt-4 p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {/* Spotify logo placeholder */}
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">Play on Spotify</span>
                    </div>

                    {/* Open Spotify button */}
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
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
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
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
      </div>
    </div>
  )
}
