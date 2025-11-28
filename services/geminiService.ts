import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askOracle = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `Ты — Мистический Оракул, древняя сущность, ведающая тайны Таро, Рун и Астрологии. 
        Твой тон — загадочный, глубокий, успокаивающий и мудрый.
        Отвечай ИСКЛЮЧИТЕЛЬНО на РУССКОМ языке.
        Дай краткое предсказание (максимум 3-4 предложения) на основе вопроса странника. 
        Используй красивые мистические метафоры (звезды, потоки энергии, шепот древних), но в конце дай мягкий практический совет.
        Никогда не говори, что ты искусственный интеллект или языковая модель.`,
        temperature: 0.8,
      }
    });

    return response.text || "Звезды сейчас скрыты туманом. Попробуй спросить позже.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "Связь с эфиром нарушена. Пожалуйста, повторите попытку позже.";
  }
};