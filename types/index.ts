export interface Job {
  id: string
  company: string
  logo: string
  title: string
  location: string
  salary: string
  postedTime: string
  description: string
  requirements: string[]
  requiredSkills: string[]
}

export interface UserProfile {
  name: string
  email: string
  profileSummary: string
  skills: string[]
  applications: Application[]
  preferredLocation: string[]
  preferredSalary: { min: number; max: number } // Ensure consistent structure
}


export interface Application {
  id: string
  jobId: string
  status: "active" | "saved" | "expired"
  appliedDate: string
  company: string
  logo: string
  title: string
  location: string
  salary: string
  skills: string[]
  lastUpdated: string
}

export type ApplicationStatus = "active" | "saved" | "expired"

