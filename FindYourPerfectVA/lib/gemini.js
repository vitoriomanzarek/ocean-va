/**
 * Google Gemini API Client
 * Handles all interactions with Google Gemini API
 * 
 * Note: This replaces OpenAI temporarily until OpenAI API key is available
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini client (lazy initialization to ensure env vars are loaded)
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
}

// Default model: gemini-1.5-flash (fast and cost-effective)
// Alternative: gemini-1.5-pro (more capable but slower)
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

/**
 * Generate the next question based on context and previous answers
 * @param {Object} context - Current matching context
 * @param {Array} conversationHistory - Previous Q&A pairs
 * @returns {Promise<string>} Next question
 */
export async function generateQuestion(context, conversationHistory = []) {
  const systemPrompt = `You are an expert Virtual Assistant matching advisor for Ocean Virtual Assistant. 
Your role is to help clients find their perfect VA match by asking strategic questions and analyzing their needs.

You have access to a catalog of 60+ Virtual Assistants with the following attributes:
- Industry/Category (Insurance, Mortgage, Real Estate, etc.)
- Specializations (specific skills and expertise)
- Tools & Systems (CRM, AMS, etc.)
- Experience Level (years)
- Languages (English, Bilingual)
- Availability (Full Time, Part Time)
- DISC Personality Type
- English Proficiency Level

Your task:
1. Ask ONE strategic question at a time
2. Analyze the user's answer to understand their needs
3. Determine what criteria to use for matching
4. After 5-8 questions, provide a summary of their needs
5. Help the matching engine find the best VAs

Guidelines:
- Be conversational and friendly
- Ask questions that help narrow down the search
- Don't ask redundant questions
- Focus on what matters most for matching
- Be concise but thorough
- Return ONLY the question text, no additional formatting`;

  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL });

  // Build conversation history
  let prompt = systemPrompt + '\n\n';
  
  // Add current context if available
  if (Object.keys(context).length > 0) {
    prompt += `Current matching criteria collected: ${JSON.stringify(context)}\n\n`;
  }

  // Add conversation history
  if (conversationHistory.length > 0) {
    prompt += 'Previous conversation:\n';
    conversationHistory.forEach(({ question, answer }) => {
      prompt += `Q: ${question}\nA: ${answer}\n\n`;
    });
  }

  prompt += 'Generate the next strategic question to help find the perfect VA match. Return only the question text.';

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate question: ${error.message}`);
  }
}

/**
 * Analyze user answer and extract matching criteria
 * @param {string} question - The question that was asked
 * @param {string} answer - User's answer
 * @param {Object} currentContext - Current matching context
 * @returns {Promise<Object>} Updated matching criteria
 */
export async function analyzeAnswer(question, answer, currentContext = {}) {
  const systemPrompt = `You are analyzing user responses to extract matching criteria for Virtual Assistants.

Extract relevant information from the user's answer and return a JSON object with the following structure:
{
  "industry": "string or null",
  "tasks": ["array of task types"],
  "tools": ["array of required tools"],
  "experienceLevel": "junior|mid|senior or null",
  "languages": ["array of languages"],
  "availability": "Full Time|Part Time or null",
  "discPreference": "D|I|S|C or null",
  "englishLevel": "A1|A2|B1|B2|C1|C2 or null",
  "notes": "any additional relevant information"
}

Only include fields that can be extracted from the answer. Return valid JSON only.`;

  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ 
    model: DEFAULT_MODEL,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500,
      responseMimeType: 'application/json',
    }
  });

  const prompt = `${systemPrompt}

Question: "${question}"
Answer: "${answer}"

Current context: ${JSON.stringify(currentContext)}

Extract matching criteria from this answer and return only the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response
    const extracted = JSON.parse(text);
    return extracted;
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Return empty object if parsing fails
    return {};
  }
}

/**
 * Generate recommendation summary and justifications
 * @param {Object} userNeeds - Complete user needs profile
 * @param {Array} topMatches - Top matched VAs with scores
 * @returns {Promise<string>} Summary text
 */
export async function generateRecommendationSummary(userNeeds, topMatches) {
  const systemPrompt = `You are providing a summary of Virtual Assistant recommendations.

Create a friendly, concise summary (2-3 sentences) explaining why these VAs are good matches.`;

  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ 
    model: DEFAULT_MODEL,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 300,
    }
  });

  const prompt = `${systemPrompt}

User needs: ${JSON.stringify(userNeeds)}

Top matches: ${JSON.stringify(topMatches.slice(0, 3))}

Generate a summary explaining why these are good matches.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'We found some great matches for you based on your needs!';
  }
}

export default { getGenAI };

