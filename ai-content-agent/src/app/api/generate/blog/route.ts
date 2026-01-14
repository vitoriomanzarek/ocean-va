import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import { promises as fs } from 'fs'
import path from 'path'

// Allow generation to take longer
export const maxDuration = 60

export async function POST(req: Request) {
    const { topic, keywords, tone } = await req.json()

    // Load Agency Context
    const contextPath = path.join(process.cwd(), 'lib/agency.md')
    let context = ""
    try {
        context = await fs.readFile(contextPath, 'utf-8')
    } catch (e) {
        console.error("Context file not found", e)
    }

    const systemPrompt = `
You are the Lead Content Strategist for Ocean VA.
Context: ${context}

Your Task: Write a high-quality, SEO-optimized blog post about: "${topic}".

Requirements:
1. **Structure**:
   - H1 Title (Catchy, SEO friendly)
   - Introduction (Hook the reader, define the problem)
   - 3-5 Body Paragraphs with H2 and H3 headings
   - Conclusion (Call to Action to hire Ocean VA)
2. **SEO**:
   - Integrate keywords: ${keywords || "virtual assistant, remote work, business growth"}
   - Use natural phrasing.
3. **Tone**: ${tone || "Professional and Empowering"}
4. **Format**: Return ONLY valid Markdown.
`

    const deepseek = createOpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEP_SEEK_AI_API_KEY,
    })

    try {
        const { text } = await generateText({
            model: deepseek.chat("deepseek-chat"),
            system: systemPrompt,
            prompt: `Write the blog post for topic: ${topic}`,
        })

        return Response.json({ content: text, status: "success" })
    } catch (error) {
        return Response.json({ error: "Failed to generate", details: error }, { status: 500 })
    }
}
