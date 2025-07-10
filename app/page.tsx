"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Heart, Camera, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  // ===== STATE MANAGEMENT =====
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Purple floating orb - top left */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

        {/* Blue floating orb - bottom right */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>

        {/* Indigo floating orb - center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* ===== LOGO AND BRAND SECTION ===== */}
        <div className="text-center mb-8">
          {/* App logo with gradient background */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full shadow-2xl">
              <Music className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* App title and tagline */}
          <h1 className="text-4xl font-bold text-white mb-2">MoodTunes</h1>
          <p className="text-blue-200">Find the perfect soundtrack for your moments</p>
        </div>

        {/* ===== LOGIN FORM CARD ===== */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-blue-200">
              Sign in to discover music that matches your mood
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email input field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
            </div>

            {/* Password input field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
            </div>

            {/* Login button */}
            <Link href="/preferences">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                Sign In
              </Button>
            </Link>

            {/* Forgot password link */}
            <div className="text-center">
              <a href="#" className="text-blue-300 hover:text-blue-200 text-sm">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>

        {/* ===== FEATURE HIGHLIGHTS SECTION ===== */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {/* AI-powered feature */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">AI-Powered</p>
            <p className="text-blue-200 text-xs">Smart recommendations</p>
          </div>

          {/* Photo analysis feature */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
            <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Photo Analysis</p>
            <p className="text-blue-200 text-xs">Mood detection</p>
          </div>

          {/* Personalized feature */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
            <Heart className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Personalized</p>
            <p className="text-blue-200 text-xs">Just for you</p>
          </div>
        </div>
      </div>
    </div>
  )
}
