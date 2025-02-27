"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchSection } from "@/components/search-section"
import { FilterChips } from "@/components/filter-chips"
import { JobCard } from "@/components/job-card"
import { JobDetails } from "@/components/job-details"
import { useJobStore } from "@/store/job-store"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer"

export default function JobBoard() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "New Jobs",
    "Full-time",
    "DevRoy NG",
    "Remote",
    "Hybrid",
  ])
  const [showType, setShowType] = useState<"new" | "suitable">("new")
  const isMobile = useIsMobile()
  const { jobs } = useJobStore()

  const handleFilterRemove = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const handleClearFilters = () => {
    setActiveFilters([])
  }

  const handleJobCardClick = (jobId: string) => {
    setSelectedJob(selectedJob === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-background gap-2 py-4">
      {/* <NavBar /> */}
      <SearchSection />
      <main className="container px-4 pb-4 ">
        {/* Filters */}
        {isMobile ? (
          <div className="flex">
            <FilterChips filters={activeFilters} onRemoveFilter={handleFilterRemove} onClearAll={handleClearFilters} />
          </div>
        ) : (
          <FilterChips filters={activeFilters} onRemoveFilter={handleFilterRemove} onClearAll={handleClearFilters} />
        )}
        <div className="grid md:grid-cols-[240px_1fr_320px] gap-6">
          {/* Sidebar */}
          {!isMobile && (
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
          )}

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <JobCard
                key={job.id}
                {...job}
                isSelected={selectedJob === job.id}
                onClick={() => handleJobCardClick(job.id)}
              />
            ))}
          </div>

          {/* Job Details */}
          {isMobile ? (
            <Drawer open={selectedJob !== null} onOpenChange={() => setSelectedJob(null)}>
              <DrawerContent className="overflow-y-scrolls">
                <JobDetails job={jobs.find((job) => job.id === selectedJob)} isVisible={true} />
              </DrawerContent>
            </Drawer>
          ) : (
            <JobDetails job={jobs.find((job) => job.id === selectedJob)} isVisible={selectedJob !== null} />
          )}
        </div>
      </main>
    </div>
  )
}
