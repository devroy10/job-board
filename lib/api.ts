// src/lib/api.ts
import axios from 'axios';
import { Job, Application } from '../types';

const api = axios.create({
    baseURL: '/api', // To be replaced with backend base URL
});

export const fetchJobs = async (): Promise<Job[]> => {
    const response = await api.get('/jobs');
    return response.data;
};

export const submitApplication = async (application: Application): Promise<void> => {
    await api.post('/applications', application);
};

export const fetchMatchScore = async (userSkills: string[], jobSkills: string[]) => {
    const response = await api.post("/api/gemini", { userSkills, jobSkills });
    return response.data.matchScore;
};