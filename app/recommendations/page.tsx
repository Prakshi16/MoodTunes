"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Heart, Share2, Download, RefreshCw, Music } from "lucide-react"

const mockRecommendations = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    mood: "Energetic",
    spotifyId: "0VjIjW4GlUZAMYd2vXMi3b",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
  {
    id: 2,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    mood: "Happy",
    spotifyId: "4ZtFanR9U6ndgddUvNcjcG",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    mood: "Upbeat",
    spotifyId: "463CkQjx2Zk1yXoBuierM9",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
  {
    id: 4,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    mood: "Chill",
    spotifyId: "5HCyWlXZPP0y6Gqq8TgA20",
    image: "/placeholder.svg?height=300&width=300",
    preview: "https://p.scdn.co/mp3-preview/...",
  },
]

export default function RecommendationsPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [likedSongs, setLikedSongs] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading recommendations
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = (songId: number) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId)
  }

  const toggleLike = (songId: number) => {
    setLikedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

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
      default:
        return "bg-purple-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Photos</h2>
          <p className="text-purple-200">Finding the perfect soundtrack for your moment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-3 rounded-full">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Perfect Playlist</h1>
          <p className="text-purple-200">Based on the mood of your photos</p>
        </div>

        {/* Mood Analysis */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white">Detected Mood</CardTitle>
            <CardDescription className="text-purple-200">We analyzed your photos and found these vibes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Happy & Energetic</Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Social & Fun</Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">Uplifting</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Song Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mockRecommendations.map((song) => (
            <Card
              key={song.id}
              className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={song.image || "/placeholder.svg"}
                      alt={song.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
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

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{song.title}</h3>
                    <p className="text-purple-200 truncate">{song.artist}</p>
                    <p className="text-purple-300 text-sm truncate">{song.album}</p>
                    <Badge className={`mt-2 ${getMoodColor(song.mood)} text-white text-xs`}>{song.mood}</Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
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
                    <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Spotify Embed Placeholder */}
                <div className="mt-4 p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">Play on Spotify</span>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      Open
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Recommendations
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Playlist
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  )
}
