import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import dotenv from "dotenv"

// Load env vars
dotenv.config({ path: '.env.local' })
// Also try .env just in case
dotenv.config({ path: '.env' })
dotenv.config({ path: '../.env' })

async function testConnection() {
    const key = process.env.DEEP_SEEK_AI_API_KEY
    console.log("Current Env Keys:", Object.keys(process.env).filter(k => k.includes("DEEP") || k.includes("API")))

    console.log("Testing DeepSeek API Connection...")
    console.log("API Key loaded:", key ? "YES (Starts with " + key.substring(0, 4) + ")" : "NO")

    if (!key) {
        console.error("ERROR: No API Key found in .env or .env.local")
        return
    }

    const deepseek = createOpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: key,
    })

    try {
        const { text } = await generateText({
            model: deepseek.chat("deepseek-chat"),
            prompt: "Say 'Hello from DeepSeek' if you can hear me.",
        })
        console.log("SUCCESS! Response received:")
        console.log(text)
    } catch (error) {
        console.error("CONNECTION FAILED:")
        console.error(error)
    }
}

testConnection()
