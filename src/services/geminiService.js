import { GoogleGenerativeAI } from '@google/generative-ai';

// Debug log for environment variable
console.log('API Key available:', !!process.env.REACT_APP_GEMINI_API_KEY);

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Gemini API key is missing in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const MEDICAL_CONTEXT = `You are MediBot, an AI health assistant. You provide helpful, accurate, and easy-to-understand information about health and wellness. Always include a disclaimer when providing medical advice. Focus on general wellness information and always recommend consulting healthcare professionals for specific medical concerns.`;

export const generateResponse = async (message, chatHistory = []) => {
  try {
    // Validate API key
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Format chat history for context
    const formattedHistory = chatHistory
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = `${MEDICAL_CONTEXT}\n\nChat History:\n${formattedHistory}\n\nUser: ${message}\nAssistant:`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      if (apiError.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      throw new Error('Failed to generate response from Gemini API.');
    }
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}; 