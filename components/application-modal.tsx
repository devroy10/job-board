"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MatchScoreBadge } from "@/components/match-score-badge"
import { calculateMatchScore } from "@/lib/match-score"
import { useJobStore } from "@/store/job-store"

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobId: string

}

interface ApplicationDetails {
  skills: string[]
  additionalNotes: string
}

export function ApplicationModal({ isOpen, onClose, jobId }: ApplicationModalProps) {
  const { jobs, userProfile } = useJobStore()
  const [step, setStep] = useState(1)
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails>({
    skills: [],
    additionalNotes: "",
  })

  const job = jobs.find((j) => j.id === jobId)
  if (!job) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <p className="text-center">Job not found.</p>
        </DialogContent>
      </Dialog>
    )
  }

  const steps = [
    { number: 1, title: "Review" },
    { number: 2, title: "Improve" },
    { number: 3, title: "Complete" },
  ]

  const matchScore = React.useMemo(() => calculateMatchScore(job, userProfile), [job, applicationDetails.skills])


  const handleAddSkill = (skill: string) => {
    if (!applicationDetails.skills.includes(skill)) {
      setApplicationDetails((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setApplicationDetails((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = () => {
    // Handle application submission
    setStep(3)
  }

  const handleClose = () => {
    setStep(1)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="relative">
          {/* Match Score Badge */}
          <div className="flex justify-center pb-4">
            <MatchScoreBadge score={matchScore} />
          </div>
          {/* Stepper header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div className="relative">
                    <motion.div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2",
                        step >= s.number
                          ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 text-gray-400",
                      )}
                      animate={{
                        scale: step === s.number ? 1.1 : 1,
                      }}
                    >
                      {step > s.number ? <Check className="w-5 h-5" /> : <span>{s.number}</span>}
                    </motion.div>
                    <div
                      className={cn(
                        "absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm",
                        step >= s.number ? "text-emerald-600" : "text-gray-400",
                      )}
                    >
                      {s.title}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn("w-20 h-0.5 mx-2", step > i + 1 ? "bg-emerald-600" : "bg-gray-200")} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {step === 1 && <StepOne key="step1" userProfile={userProfile} onContinue={() => setStep(2)} />}
            {step === 2 && (
              <StepTwo
                key="step2"
                requiredSkills={job.requiredSkills}
                selectedSkills={applicationDetails.skills}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
              />
            )}
            {step === 3 && (
              <StepThree key="step3" onViewApplication={() => console.log("View application")} onClose={handleClose} />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StepOne({
  userProfile,
  onContinue,
}: {
  userProfile: any
  onContinue: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Application</h3>
        <p className="text-sm text-muted-foreground">
          You're applying for the position of jobTitle at company
        </p>
      </div>

      <div className="p-4 border rounded-lg">
        <h4 className="font-medium mb-2">{userProfile.name}</h4>
        <p className="text-sm text-muted-foreground">{userProfile.profileSummary}</p>
        <h4 className="font-medium mt-2">Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {userProfile.skills.map((skill: string) => (
            <span key={skill} className="px-2 py-1 text-xs border rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Your Profile Summary</h4>
          <div className="text-sm text-muted-foreground">
            <p>5 years of experience in UI/UX Design</p>
            <p>Proficient in Figma, Adobe XD</p>
            <p>Led design teams at various startups</p>
          </div>
        </div>
      </div> */}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onContinue}>
          Improve Application
        </Button>
        <Button onClick={onContinue} className="bg-emerald-600 hover:bg-emerald-700">
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function StepTwo({
  requiredSkills,
  selectedSkills,
  onAddSkill,
  onRemoveSkill,
  onSubmit,
  onBack,
}: {
  requiredSkills: string[]
  selectedSkills: string[]
  onAddSkill: (skill: string) => void
  onRemoveSkill: (skill: string) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const missingSkills = requiredSkills.filter((skill) => !selectedSkills.includes(skill))

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">Improve Your Application</h3>
        <p className="text-sm text-muted-foreground">Add relevant skills to increase your chances of getting hired</p>
      </div>

      {/*  Skills Comparison */}
      {/* <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill) => (
              <Button
                key={skill}
                variant="outline"
                size="sm"
                className={cn(
                  "gap-2",
                  selectedSkills.includes(skill) && "border-emerald-600 bg-emerald-50 text-emerald-600",
                )}
                onClick={() => (selectedSkills.includes(skill) ? onRemoveSkill(skill) : onAddSkill(skill))}
              >
                {skill}
                {selectedSkills.includes(skill) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Your Selected Skills</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Button key={skill} variant="outline" size="sm" className="gap-2" onClick={() => onRemoveSkill(skill)}>
                {skill}
                <X className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </div> */}
      <div className="space-y-4">
        <h4 className="font-medium">Skills You Already Have</h4>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span key={skill} className="px-2 py-1 text-xs border rounded-full bg-green-50 text-green-700">
              {skill}
            </span>
          ))}
        </div>

        <h4 className="font-medium mt-4">Missing Skills</h4>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill) => (
            <Button key={skill} variant="outline" size="sm" onClick={() => onAddSkill(skill)}>
              {skill} <Plus className="ml-1 h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} className="bg-emerald-600 hover:bg-emerald-700">
          Submit Application
        </Button>
      </div>
    </motion.div>
  )
}

function StepThree({
  onViewApplication,
  onClose,
}: {
  onViewApplication: () => void
  onClose: () => void
}) {
  const router = useRouter()

  const handleViewApplication = () => {
    // Navigate to applications page with highlight parameter
    router.push("/applications?highlight=app-1") // Replace app-1 with actual application ID
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center"
      >
        <Check className="w-8 h-8 text-emerald-600" />
      </motion.div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
        <p className="text-sm text-muted-foreground">
          Your application has been successfully submitted. We'll notify you of any updates.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={handleViewApplication}>
          View Application
        </Button>
        <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700">
          Back to Jobs
        </Button>
      </div>
    </motion.div>
  )
}