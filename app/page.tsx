"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchSection } from "@/components/search-section"
import { FilterChips } from "@/components/filter-chips"
import { JobCard } from "@/components/job-card"
import { JobDetails } from "@/components/job-details"
import { useJobStore } from "@/store/job-store"

export default function JobBoard() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "New Jobs",
    "Full-time",
    "Freelance",
    "Remote",
    "Hybrid",
  ])
  const [showType, setShowType] = useState<"new" | "suitable">("new")

  // const {jobs } = useSWR ("/api/jobs", fetcher)
  const { jobs } = useJobStore();

  const handleFilterRemove = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const handleClearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <NavBar /> */}
      <SearchSection />
      <main className="container px-4 pb-4 ">
        <FilterChips filters={activeFilters} onRemoveFilter={handleFilterRemove} onClearAll={handleClearFilters} />
        <div className="grid grid-cols-[240px_1fr_320px] gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Show By</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={showType === "new" ? "bg-emerald-50 border-emerald-600 text-emerald-600" : ""}
                  onClick={() => setShowType("new")}
                >
                  New Jobs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={showType === "suitable" ? "bg-emerald-50 border-emerald-600 text-emerald-600" : ""}
                  onClick={() => setShowType("suitable")}
                >
                  Most Suitable
                </Button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <JobCard
                key={job.id}
                {...job}
                isSelected={selectedJob === job.id}
                onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
              />
            ))}
          </div>

          {/* Job Details */}
          <JobDetails job={jobs.find((job) => job.id === selectedJob)} isVisible={selectedJob !== null} />
        </div>
      </main>
    </div>
  )
}
