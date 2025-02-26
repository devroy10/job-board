import type { Job, UserProfile } from "@/types"
import { Application } from '../types/index';

export const mockUser: UserProfile = {
  name: "Joseph Mary",
  email: "testing@email.com",
  profileSummary: '5 years of UI design experience',
  skills: ["UI Design", "UX Research", "Figma", "User Testing", "Prototyping", "Design Systems"],
  applications: [] as Application[],
  preferredLocation: ["Jakarta", "Remote"],
  preferredSalary: { min: 2000, max: 4000 },
}

export const mockJobs: Job[] = [
  {
    id: "job-1",
    company: "Twitter",
    logo: "/logo-black.png",
    title: "UI/UX Designer",
    location: "Jakarta, Indonesia",
    salary: "$2,000 - $3,000 USD",
    postedTime: "Posted 10 mins ago",
    description: "We are looking for a UI/UX Designer to turn our software into easy-to-use products for our clients.",
    requirements: [
      "3+ years of experience in UI/UX design",
      "Strong portfolio of design projects",
      "Excellent problem-solving skills",
      "Experience with Figma and other design tools",
    ],
    requiredSkills: ["UI Design", "UX Research", "Figma", "User Testing", "Prototyping", "Design Systems"],
  },
  {
    id: "job-2",
    company: "Blender",
    logo: "/blender.png",
    title: "Product Designer",
    location: "Jakarta, Indonesia",
    salary: "$3,000 - $3,500 USD",
    postedTime: "Posted 10 mins ago",
    description: "Join our growing design team to create intuitive and engaging user experiences.",
    requirements: [
      "5+ years of experience in product design",
      "Experience with mobile-first design",
      "Strong understanding of user research",
      "Excellent communication skills",
    ],
    requiredSkills: ["Product Design", "Mobile Design", "User Research", "Design Systems", "Prototyping"],
  },
  {
    id: "job-3",
    company: "Walmart",
    logo: "/walmart-logo.png",
    title: "Frontend Engineer",
    location: "Menlo Park, CA",
    salary: "$120,000 - $180,000 USD",
    postedTime: "Posted 3 hours ago",
    description: "We're looking for a talented and passionate Frontend Engineer to join our team and help build the next generation of social experiences. You will work on a variety of projects, from improving existing features to developing new ones.  We're a collaborative team that values innovation and a commitment to quality.",
    requirements: [
      "3+ years of professional experience in frontend development",
      "Proficiency in React, Redux, and JavaScript (ES6+)",
      "Experience with responsive design and cross-browser compatibility",
      "Understanding of RESTful APIs and data fetching techniques",
      "Experience with version control systems (Git)",
      "Excellent problem-solving and communication skills"
    ],
    requiredSkills: ["React", "Redux", "JavaScript", "HTML", "CSS", "Responsive Design", "REST APIs", "Git", "Testing (Jest/Cypress preferred)"]
  }
]

// export const mockApplications: Application[] = [
//   {
//     id: "app-1",
//     jobId: "job-1",
//     status: "active",
//     appliedDate: "2024-02-24",
//     company: "Twitter",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/job%20dashboard%20view%201-4b2GhokApBo7Uygr2qZDges7ghm3vs.png",
//     title: "UI/UX Designer",
//     location: "Jakarta, Indonesia",
//     salary: "$2,000 - $3,000 USD",
//     skills: ["UI Design", "UX Research", "Figma"],
//     lastUpdated: "2024-02-24T10:00:00Z",
//   },
//   {
//     id: "app-2",
//     jobId: "job-2",
//     status: "saved",
//     appliedDate: "2024-02-23",
//     company: "Clubhouse",
//     logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/job%20dashboard%20view%201-4b2GhokApBo7Uygr2qZDges7ghm3vs.png",
//     title: "Product Designer",
//     location: "Jakarta, Indonesia",
//     salary: "$3,000 - $3,500 USD",
//     skills: ["Product Design", "Mobile Design"],
//     lastUpdated: "2024-02-23T15:30:00Z",
//   },
// ]

