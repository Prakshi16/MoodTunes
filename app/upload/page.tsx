"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ImageIcon, X, Camera, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function UploadPage() {
  // ===== STATE MANAGEMENT =====
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [contextComment, setContextComment] = useState("")

  // ===== DRAG AND DROP HANDLERS =====
  // Handle drag events (enter, over, leave)
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  // Handle file drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    // Process dropped files - filter for images only
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
      setUploadedImages((prev) => [...prev, ...files])
    }
  }, [])

  // ===== FILE INPUT HANDLERS =====
  // Handle file selection via input element
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))
      setUploadedImages((prev) => [...prev, ...files])
    }
  }

  // Remove image from uploaded list
  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 p-4">
      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rose floating orb - top right */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-rose-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>

        {/* Purple floating orb - bottom left */}
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ===== PAGE HEADER SECTION ===== */}
        <div className="text-center mb-8">
          {/* App logo with rose-purple gradient */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-purple-500 p-3 rounded-full">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Page title and description */}
          <h1 className="text-4xl font-bold text-white mb-2">Share Your Moment</h1>
          <p className="text-rose-200">Upload photos and let us find the perfect soundtrack</p>
        </div>

        {/* ===== FILE UPLOAD AREA ===== */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-rose-400" />
              Upload Your Photos
            </CardTitle>
            <CardDescription className="text-rose-200">Drag and drop your images or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Drag and drop zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive ? "border-rose-400 bg-rose-400/10" : "border-white/30 hover:border-rose-400/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {/* Upload icon */}
              <Upload className="w-12 h-12 text-rose-400 mx-auto mb-4" />

              {/* Upload instructions */}
              <p className="text-white mb-4">
                Drop your images here, or{" "}
                <label className="text-rose-400 hover:text-rose-300 cursor-pointer underline">
                  browse
                  <input type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" />
                </label>
              </p>

              {/* File format and size info */}
              <p className="text-rose-200 text-sm">Supports JPG, PNG, GIF up to 10MB each</p>
            </div>
          </CardContent>
        </Card>

        {/* ===== CONTEXT COMMENT SECTION ===== */}
        {/* RECENT CHANGE: New section for users to provide context about their photos */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-rose-400" />
              Tell Us More
            </CardTitle>
            <CardDescription className="text-rose-200">
              Help us understand the context of your photos for better recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="context" className="text-white">
                What's the occasion or mood? (Optional)
              </Label>
              <Textarea
                id="context"
                placeholder="e.g., It's Valentine's Day, Birthday celebration, Road trip with friends, Cozy evening at home, Workout session, etc."
                value={contextComment}
                onChange={(e) => setContextComment(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-rose-200 min-h-[100px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <p className="text-rose-300 text-xs">
                  💡 Examples: "Valentine's dinner", "Birthday party", "Beach vacation", "Study session"
                </p>
                <span className="text-rose-300 text-xs">{contextComment.length}/500</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== UPLOADED IMAGES GALLERY ===== */}
        {uploadedImages.length > 0 && (
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-white">Uploaded Images ({uploadedImages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Image grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    {/* Image container */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <Image
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Remove button - appears on hover */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ===== GENERATE RECOMMENDATIONS SECTION ===== */}
        <div className="text-center">
          <Link href="/recommendations">
            <Button
              className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              disabled={uploadedImages.length === 0}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Music Recommendations
            </Button>
          </Link>

          {/* Show instruction if no images uploaded */}
          {uploadedImages.length === 0 && (
            <p className="text-rose-200 text-sm mt-2">Please upload at least one image to continue</p>
          )}
        </div>
      </div>
    </div>
  )
}
