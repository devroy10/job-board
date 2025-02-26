"use client"

import { useState } from "react"
import { Search, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchSection() {
  const [jobSearch, setJobSearch] = useState("")
  const [locationSearch, setLocationSearch] = useState("")

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", { jobSearch, locationSearch })
  }

  return (
    <div className="container px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">History</h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">UX Designer</span>
            <div className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">14 New</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Product Designer</span>
            <div className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">6 New</div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="UI/UX Designer"
            className="pl-9 pr-8"
            value={jobSearch}
            onChange={(e) => setJobSearch(e.target.value)}
          />
          {jobSearch && (
            <button className="absolute right-3 top-2.5" onClick={() => setJobSearch("")}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Jakarta, Indonesia"
            className="pl-9 pr-8"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
          {locationSearch && (
            <button className="absolute right-3 top-2.5" onClick={() => setLocationSearch("")}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button className="px-8 bg-emerald-600 hover:bg-emerald-700" onClick={handleSearch}>
          Find Jobs
        </Button>
      </div>
    </div>
  )
}

