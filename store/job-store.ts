import { create } from "zustand";
import { Job, UserProfile, Application } from "@/types";
import { mockJobs, mockUser } from "@/lib/mock-data";

interface JobStore {
    jobs: Job[];
    userProfile: UserProfile;
    setJobs: (jobs: Job[]) => void;
    setUserProfile: (profile: UserProfile) => void;
    saveJob: (job: Omit<Application, "status" | "appliedDate" | "lastUpdated">) => void;
    removeSavedJob: (jobId: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
    jobs: [...mockJobs],
    userProfile: { ...mockUser },

    setJobs: (jobs) => set({ jobs }),
    setUserProfile: (profile) => set({ userProfile: profile }),

    saveJob: (job) => {
        set((state) => {
            const { userProfile } = state;

            // Check if job is already saved
            const alreadySaved = userProfile.applications.some(
                (app) => app.jobId === job.jobId && app.status === "saved"
            );
            if (alreadySaved) return state; // Prevent duplicates

            const newApplication: Application = {
                ...job,
                status: "saved",
                appliedDate: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
            };

            return {
                userProfile: {
                    ...userProfile,
                    applications: [...userProfile.applications, newApplication],
                },
            };
        });
    },

    removeSavedJob: (jobId) => {
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                applications: state.userProfile.applications.filter((app) => app.jobId !== jobId || app.status !== "saved"),
            },
        }));
    },
}));
