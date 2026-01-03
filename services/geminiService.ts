import { GoogleGenAI } from "@google/genai";
import { Skill } from "../types";

const GEMINI_API_KEY = process.env.API_KEY || '';

export const generateTrainingPlan = async (weakSkills: Skill[]): Promise<string> => {
  if (!GEMINI_API_KEY) {
    console.warn("API Key not found");
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    // Select up to 3 random weak skills to focus on
    const shuffled = weakSkills.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const skillNames = selected.map(s => `${s.name} (${s.difficulty})`).join(', ');

    const prompt = `
      I am an amateur badminton player. I need a 1-hour solo training plan.
      My current weaknesses are: ${skillNames}.
      
      Please provide a concise training plan in JSON format with the following structure:
      {
        "intro": "Brief encouraging intro",
        "warmup": "5 min warmup routine",
        "drills": [
           { "name": "Drill Name", "duration": "15 min", "description": "How to do it focusing on the checkpoints." }
        ],
        "cooldown": "5 min cooldown"
      }
      
      The Checkpoints for these skills are:
      ${selected.map(s => `- ${s.name}: ${s.checkPoints}`).join('\n')}
      
      Focus on the specific checkpoints provided. Keep it simple and practical.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return response.text || "Failed to generate plan.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate a plan at this moment. Please try again later.";
  }
};