import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { promises as fs } from 'fs'
import path from 'path'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
    console.log("--- POST /api/chat CALLED ---")
    const key = process.env.DEEP_SEEK_AI_API_KEY
    console.log("API Key present:", !!key)

    const { messages } = await req.json()
    console.log("Received messages count:", messages.length)

    // Load Agency Context
    const contextPath = path.join(process.cwd(), 'lib/agency.md')
    let context = ""
    try {
        context = await fs.readFile(contextPath, 'utf-8')
    } catch (e) {
        console.error("Context file not found", e)
    }

    const systemPrompt = `
You are Ocean Content AI, a specialized marketing assistant for Ocean VA.
Your goal is to help plan, write, and optimize content for the agency.

CONTEXT ABOUT OCEAN VA:
${context}

RULES:
1. Tone: Professional, Empowering, Direct.
2. Always think about SEO impact.
3. If asked for a post, format it clearly with [Title], [Platform], and [Body].
4. Suggest using Emojis only for Social Media, not for Blog titles.
`

    const deepseek = createOpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEP_SEEK_AI_API_KEY,
    })

    // console.log("Incoming chat request", messages)
    try {
        const result = streamText({
            model: deepseek.chat("deepseek-chat"),
            messages,
            system: systemPrompt,
            onFinish: () => console.log("Generation finished"),
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error("Chat API Error:", error)
        return new Response(JSON.stringify({ error: "Failed to generate chat response" }), { status: 500 })
    }
}
