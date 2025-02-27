"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ApplicationModal } from "./application-modal"

interface JobDetailsProps {
  job?: {
    id: string 
    company: string
    logo: string
    title: string
    description: string
    requirements: string[]
  }
  isVisible: boolean
}

export function JobDetails({ job, isVisible }: JobDetailsProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  if (!job) return null

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border rounded-lg p-4 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-lg">{job.title}</h2>
                <div className="text-sm text-muted-foreground">{job.company}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pass jobId to ApplicationModal */}
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setIsApplicationModalOpen(true)}
            >
              Apply Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        jobId={job.id} //  Ensure ApplicationModal receives jobId
      />
    </>
  )
}
