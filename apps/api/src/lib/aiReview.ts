import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeWithAi(diff: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `
You are a senior engineer reviewing pull requests.
Always reply in strict JSON with keys: comment, bugRiskScore (0-10), suggestions.

Analyze this diff:
${diff}

Rules:
- "comment" must be max 1-2 lines about what it does.
- "bugRiskScore" must be an integer between 0–10
- "suggestions" must be max 1-3 lines. This means suggest fixes if there are bugs and if not reply No bugs detected.
            `,
                    },
                ],
            },
        ],
    });

    const text =
        response.text ||
        response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("No response text from Gemini");
    }

    const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("Failed to parse AI response:", cleaned);
        throw err;
    }
}