/**
 * OpenAI API Client
 * Handles all interactions with ChatGPT/OpenAI API
 */

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

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

  const messages = [
    {
      role: 'system',
      content: systemPrompt
    }
  ];

  // Add conversation history
  conversationHistory.forEach(({ question, answer }) => {
    messages.push({
      role: 'user',
      content: answer
    });
    messages.push({
      role: 'assistant',
      content: `Understood. ${question}`
    });
  });

  // Add current context if available
  if (Object.keys(context).length > 0) {
    messages.push({
      role: 'system',
      content: `Current matching criteria collected: ${JSON.stringify(context)}`
    });
  }

  // Request next question
  messages.push({
    role: 'user',
    content: 'Generate the next strategic question to help find the perfect VA match. Return only the question text.'
  });

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 200
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
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

  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: `Question: "${question}"\nAnswer: "${answer}"\n\nCurrent context: ${JSON.stringify(currentContext)}\n\nExtract matching criteria from this answer.`
    }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages,
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    });

    const extracted = JSON.parse(response.choices[0].message.content);
    return extracted;
  } catch (error) {
    console.error('OpenAI API Error:', error);
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

Create a friendly, concise summary explaining why these VAs are good matches.`;

  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: `User needs: ${JSON.stringify(userNeeds)}\n\nTop matches: ${JSON.stringify(topMatches.slice(0, 3))}\n\nGenerate a summary (2-3 sentences) explaining why these are good matches.`
    }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return 'We found some great matches for you based on your needs!';
  }
}

export default openai;

