const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function testingPrompting() {
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Run a prompt
    const prompt = "What does this look store-bought or homemade?";
    
    const result = await model.generateContent([prompt]);
    console.log(result.response.text());
}