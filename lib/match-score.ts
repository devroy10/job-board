import { Job, UserProfile } from "@/types"

// Mock user profile data
// const userProfile = {
//   skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "User Testing", "Design Systems"],
//   experience: 5,
//   preferredLocations: ["Jakarta", "Remote"],
//   preferredSalaryRange: {
//     min: 2000,
//     max: 4000,
//   },
// }


export function calculateMatchScore(job: Job, userProfile: UserProfile): number {
  if (!job.requiredSkills || !Array.isArray(job.requiredSkills)) return 0

  let score = 0
  let totalPoints = 0

  // Skills Match (50% weight)
  const skillsPoints = 50
  totalPoints += skillsPoints
  const matchedSkills = job.requiredSkills.filter((skill) => userProfile.skills.includes(skill))
  score += (matchedSkills.length / job.requiredSkills.length) * skillsPoints

  // Location Match (20% weight)
  const locationPoints = 20
  totalPoints += locationPoints
  const locationMatch = userProfile.preferredLocation.some((loc) =>
    job.location.toLowerCase().includes(loc.toLowerCase())
  )
  if (locationMatch) score += locationPoints

  // Salary Match (30% weight)
  const salaryPoints = 30
  totalPoints += salaryPoints
  const jobSalary = parseSalaryRange(job.salary)
  if (jobSalary) {
    const salaryMatch =
      jobSalary.min >= userProfile.preferredSalary.min &&
      jobSalary.max <= userProfile.preferredSalary.max
    if (salaryMatch) score += salaryPoints
  }

  return Math.round((score / totalPoints) * 100)
}

function parseSalaryRange(salary: string): { min: number; max: number } | null {
  const matches = salary.match(/\$(\d+,?\d*)\s*-\s*\$(\d+,?\d*)/)
  if (!matches) return null

  const min = Number.parseInt(matches[1].replace(",", ""))
  const max = Number.parseInt(matches[2].replace(",", ""))
  return { min, max }
}

