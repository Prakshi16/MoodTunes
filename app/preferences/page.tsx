"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Languages, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

// ===== STATIC DATA ARRAYS =====
const availableLanguages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Korean",
  "Chinese",
  "Hindi",
  "Arabic",
  "Russian",
]

const popularArtists = [
  "Taylor Swift",
  "Ed Sheeran",
  "Billie Eilish",
  "The Weeknd",
  "Ariana Grande",
  "Drake",
  "Dua Lipa",
  "Post Malone",
  "Olivia Rodrigo",
  "Harry Styles",
  "BTS",
  "Bad Bunny",
  "Adele",
  "Justin Bieber",
  "Doja Cat",
]

export default function PreferencesPage() {
  // ===== STATE MANAGEMENT =====
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])

  // ===== HELPER FUNCTIONS =====
  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  // Toggle artist selection
  const toggleArtist = (artist: string) => {
    setSelectedArtists((prev) => (prev.includes(artist) ? prev.filter((a) => a !== artist) : [...prev, artist]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Emerald floating orb - top right */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>

        {/* Cyan floating orb - bottom left */}
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ===== PAGE HEADER SECTION ===== */}
        <div className="text-center mb-8">
          {/* App logo with emerald-cyan gradient */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full">
              <Music className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Page title and description */}
          <h1 className="text-4xl font-bold text-white mb-2">Tell Us Your Taste</h1>
          <p className="text-emerald-200">Help us personalize your music recommendations</p>
        </div>

        {/* ===== PREFERENCE SELECTION CARDS ===== */}
        <div className="space-y-8">
          {/* Language preferences card */}
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Languages className="w-5 h-5 mr-2 text-emerald-400" />
                Preferred Languages
              </CardTitle>
              <CardDescription className="text-emerald-200">
                Select the languages you enjoy listening to
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Language selection badges */}
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((language) => (
                  <Badge
                    key={language}
                    onClick={() => toggleLanguage(language)}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedLanguages.includes(language)
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                        : "bg-white/10 text-emerald-200 hover:bg-white/20"
                    }`}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Artist preferences card */}
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-cyan-400" />
                Favorite Artists
              </CardTitle>
              <CardDescription className="text-emerald-200">Choose artists whose music you love</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Artist selection badges */}
              <div className="flex flex-wrap gap-2">
                {popularArtists.map((artist) => (
                  <Badge
                    key={artist}
                    onClick={() => toggleArtist(artist)}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedArtists.includes(artist)
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white"
                        : "bg-white/10 text-cyan-200 hover:bg-white/20"
                    }`}
                  >
                    {artist}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ===== CONTINUE BUTTON SECTION ===== */}
        <div className="mt-8 text-center">
          <Link href="/upload">
            <Button
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              disabled={selectedLanguages.length === 0 && selectedArtists.length === 0}
            >
              Continue to Upload
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          {/* Selection summary */}
          {(selectedLanguages.length > 0 || selectedArtists.length > 0) && (
            <div className="mt-4 text-emerald-200 text-sm">
              Selected: {selectedLanguages.length} languages, {selectedArtists.length} artists
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
