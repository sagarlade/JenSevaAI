import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SCHEMES_DB, SUPPORTED_LANGUAGES } from "../constants";
import { GeminiResponse, LanguageCode } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Construct the system instruction context
const schemesContext = JSON.stringify(SCHEMES_DB.map(s => ({
  id: s.id,
  name: s.name,
  eligibility: s.eligibility.join(', '),
  sector: s.sector
})));

const getSystemInstruction = (languageCode: LanguageCode) => {
  const languageName = SUPPORTED_LANGUAGES.find(l => l.code === languageCode)?.name || 'English';
  
  return `
You are JanSeva AI, an intelligent government welfare assistant for India.
Your goal is to help users find schemes they are eligible for based on their description.

Here is the database of available schemes in JSON format:
${schemesContext}

**CORE INSTRUCTIONS:**

1. **PROFILE EXTRACTION (Mental Step):**
   - Analyze the user's input to extract a structured profile.
   - **Occupation:** Identify terms like "Farmer" (Kisan), "Student", "Laborer" (Mazdoor), "Weaver", "Artisan", "Unemployed", "Homemaker".
   - **Demographics:** Look for Age, Gender (Woman/Girl/Female), Caste/Category (SC/ST/OBC/General), Income Level, Landholding size (for farmers).
   - **Needs:** Identify specific needs like "Scholarship", "Pension", "Loan", "Housing", "Treatment", "Insurance".
   - **Local Terms:** robustly handle Indian context (e.g., 'Khet' = Land, 'Beti' = Girl Child, 'Shiksha' = Education, 'Garib' = Poor/BPL).

2. **ELIGIBILITY MATCHING:**
   - STRICTLY compare the extracted profile against the 'eligibility' criteria in the Scheme Database.
   - **Occupation Matching:**
     - If user is a **Farmer** (or has land), check 'PM Kisan', 'PMFBY'.
     - If user is a **Student**, check 'Post Matric Scholarship', etc.
     - If user is **Unemployed** or **Unorganized Worker**, check 'Atal Pension', 'NREGA' (if available).
     - If user is **Female** (or mentions daughter/girl child), check 'Sukanya Samriddhi', 'Maternity Benefits'.
     - If user mentions **Housing/Shelter**, check 'PMAY'.
     - If user mentions **Health/Sickness**, check 'Ayushman Bharat'.

3. **RESPONSE GENERATION:**
   - User has selected the language: **${languageName} (${languageCode})**. You MUST reply in this language.
   - **Scheme Names:** Always keep the official Scheme Names in English (e.g., "PM Kisan Samman Nidhi") even when replying in ${languageName}.
   - **Tone:** Empathetic, clear, and helpful.
   - **Explanation:** Briefly explain *why* a scheme is recommended based on their input (e.g., "Since you are a farmer with 2 acres...").
   - If missing details prevent a confident match, ask for them (e.g., "To help you better, could you tell me your caste or annual income?").

**CRITICAL RULES:**
- If the user explicitly states a profession (e.g., "I am a driver", "I am a student"), prioritise schemes relevant to that profession or general social security.
- Return the response in the specified JSON format.
`;
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description: "A natural language response to the user. Explain why they match the schemes or ask for missing details (like land size or income) if needed to confirm eligibility. Use the requested language.",
    },
    schemeIds: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of Scheme IDs from the provided database that match the user's profile.",
    },
  },
  required: ["reply", "schemeIds"],
};

export const getSchemeRecommendations = async (userMessage: string, language: LanguageCode): Promise<GeminiResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text) as GeminiResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      reply: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later.",
      schemeIds: []
    };
  }
};