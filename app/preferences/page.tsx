"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, ArrowRight, Globe, Mic } from "lucide-react"
import Link from "next/link"

// ===== STATIC DATA ARRAYS =====
const languages = [
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

const artists = [
  "Taylor Swift",
  "Drake",
  "Billie Eilish",
  "The Weeknd",
  "Ariana Grande",
  "Ed Sheeran",
  "Dua Lipa",
  "Post Malone",
  "Olivia Rodrigo",
  "Harry Styles",
  "BTS",
  "Bad Bunny",
  "Doja Cat",
  "Travis Scott",
  "Lana Del Rey",
]

export default function PreferencesPage() {
  // ===== STATE MANAGEMENT =====
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])

  // ===== HELPER FUNCTIONS =====
  // Toggle language selection - add if not present, remove if present
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  // Toggle artist selection - add if not present, remove if present
  const toggleArtist = (artist: string) => {
    setSelectedArtists((prev) => (prev.includes(artist) ? prev.filter((a) => a !== artist) : [...prev, artist]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Emerald floating orb - top left */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>

        {/* Cyan floating orb - bottom right */}
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
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
          <p className="text-emerald-200">Help us understand your music preferences</p>
        </div>

        {/* ===== PREFERENCE SELECTION CARDS ===== */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* ===== LANGUAGES SELECTION CARD ===== */}
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-emerald-400" />
                Languages
              </CardTitle>
              <CardDescription className="text-emerald-200">
                Select the languages you enjoy listening to
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Language badges grid */}
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Badge
                    key={language}
                    variant={selectedLanguages.includes(language) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedLanguages.includes(language)
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                        : "border-white/30 text-white hover:bg-white/10"
                    }`}
                    onClick={() => toggleLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ===== ARTISTS SELECTION CARD ===== */}
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mic className="w-5 h-5 mr-2 text-cyan-400" />
                Favorite Artists
              </CardTitle>
              <CardDescription className="text-emerald-200">Choose artists you love to listen to</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Artist badges grid */}
              <div className="flex flex-wrap gap-2">
                {artists.map((artist) => (
                  <Badge
                    key={artist}
                    variant={selectedArtists.includes(artist) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedArtists.includes(artist)
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                        : "border-white/30 text-white hover:bg-white/10"
                    }`}
                    onClick={() => toggleArtist(artist)}
                  >
                    {artist}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ===== CONTINUE BUTTON SECTION ===== */}
        <div className="text-center">
          <Link href="/upload">
            <Button
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              disabled={selectedLanguages.length === 0 && selectedArtists.length === 0}
            >
              Continue to Upload
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* ===== SELECTION SUMMARY ===== */}
        {/* Show summary only if user has made selections */}
        {(selectedLanguages.length > 0 || selectedArtists.length > 0) && (
          <div className="mt-8 text-center">
            <p className="text-white/80 text-sm">
              Selected: {selectedLanguages.length} languages, {selectedArtists.length} artists
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
