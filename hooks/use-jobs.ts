import { useQuery } from '@tanstack/react-query';

const fetchJobs = async () => {
  const response = await fetch('/api/jobs');
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
};

export function useJobs() {
  return useQuery(['jobs'], fetchJobs);
}
