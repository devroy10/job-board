// src/lib/jobMatcher.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function calculateJobMatch(userSkills: string[], requiredSkills: string[]): Promise<number> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Given the user skills: ${userSkills.join(', ')} and the job required skills: $requiredSkills.join(', ')}, calculate a match score as a percentage. Return only the numeric value.`;

    const result = await model.generateContent(prompt);
    const matchScore = parseInt(result.response.text(), 10);

    return matchScore;
}