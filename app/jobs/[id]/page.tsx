"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useJobStore } from "@/store/job-store" 
import { JobDetails } from "@/components/job-details" 

export default function JobDetailPage() {
    const { jobs } = useJobStore() 
    const searchParams = useSearchParams() ;
    const id = searchParams.get('job');
    const [job, setJob] = useState<any>(null)

    useEffect(() => {
        if (id) {
            const job = jobs.find((job) => job.id === id) 
            setJob(job) 
        }
    }, [id, jobs])

    if (!job) {
        return <p>Job not found.</p> 
    }

    return (
        <div className="container px-4 py-8">
            <JobDetails job={job} isVisible={true} /> 
        </div>
    )
}
