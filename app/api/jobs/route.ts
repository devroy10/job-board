import { mockJobs } from '@/lib/mock-data';
import { NextResponse } from 'next/server';


export async function GET() {
    // Mock data; replace with your database fetching logic
    setTimeout(() => {
        console.log("simulating fetch jobs api call to db");
    }, 1000);

    const jobs = mockJobs

    return NextResponse.json(jobs);
}
