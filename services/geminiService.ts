
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProfessionalDescription(itemName: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a very short, professional invoice description for a photography studio item: "${itemName}". Max 10 words. Example: "High-resolution edited digital portraits with full licensing."`,
    });
    return response.text?.trim() || "Professional studio deliverable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "High-quality professional studio deliverable.";
  }
}
