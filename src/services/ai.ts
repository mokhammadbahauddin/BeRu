import { GoogleGenerativeAI } from '@google/generative-ai';

// In a real app, use an env variable. For this prototype, we'll try to find it or use a user-provided one.
// The user provided `const apiKey = "";` in the index.html.
// We will try to read from process.env or fallback.
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

// Fallback responses if AI fails or no key
const FALLBACKS = {
  mood: "Kwek! Aku di sini untukmu. 💙",
  activity: "Coba minum air putih dan tarik napas dalam-dalam. 💧",
  chat: "Kwek kwek! (Sinyal bebek lagi susah, tapi aku mendengarkanmu!)"
};

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

export const initAI = () => {
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }
};

export const getMoodResponse = async (mood: string, score: number): Promise<string> => {
  if (!model) return FALLBACKS.mood;
  try {
    const prompt = `User just logged mood: ${mood} (Score: ${score}/100). Give a 1-sentence supportive response in casual Indonesian slang (Bahasa Gaul), acting as a cute duck companion named Bebek Biru. Max 10 words.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || FALLBACKS.mood;
  } catch (e) {
    console.error(e);
    return FALLBACKS.mood;
  }
};

export const getMagicActivity = async (moodScore: number): Promise<string> => {
  if (!model) return FALLBACKS.activity;
  try {
    const prompt = `Give one very short (max 8 words) self-care activity suggestion for someone with mood score ${moodScore}/100. Casual Indonesian.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || FALLBACKS.activity;
  } catch (e) {
    console.error(e);
    return FALLBACKS.activity;
  }
};

export const getChatReply = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  if (!model) return FALLBACKS.chat;
  try {
    // Gemini Pro handles chat history, but for simplicity here we just use generateContent with context
    // or we use startChat if we want to maintain state.
    // Let's use simple prompting for "stateless" but contextual-ish reply.
    const context = "You are Bebek Biru, a supportive, cute, mental health companion duck. You speak in casual Indonesian (Bahasa Gaul). You use 'Kwek' occasionally. Keep replies short (max 20 words) and warm.";
    const conversation = history.map(h => `${h.role === 'user' ? 'User' : 'Bebek'}: ${h.text}`).join('\n');
    const prompt = `${context}\n\n${conversation}\nUser: ${newMessage}\nBebek:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || FALLBACKS.chat;
  } catch (e) {
    console.error(e);
    return FALLBACKS.chat;
  }
};
