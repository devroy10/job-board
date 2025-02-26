"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useJobStore } from "@/store/job-store" // ✅ Use Zustand store
import { JobDetails } from "@/components/job-details" // ✅ JobDetails component

export default function JobDetailPage() {
    const { jobs } = useJobStore() // ✅ Access jobs from Zustand store
    const searchParams = useSearchParams() ;
    const id = searchParams.get('job');
    const [job, setJob] = useState<any>(null)

    useEffect(() => {
        if (id) {
            const job = jobs.find((job) => job.id === id) // ✅ Find job by ID
            setJob(job) // ✅ Set the job state
        }
    }, [id, jobs])

    if (!job) {
        return <p>Job not found.</p> // ✅ Show loading state or error if job is not found
    }

    return (
        <div className="container px-4 py-8">
            <JobDetails job={job} isVisible={true} /> {/* ✅ Pass the job to JobDetails */}
        </div>
    )
}
