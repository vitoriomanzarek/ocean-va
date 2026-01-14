import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import dotenv from "dotenv"

// Load env vars
dotenv.config({ path: '.env.local' })
// Also try .env just in case
dotenv.config({ path: '.env' })

async function testConnection() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    console.log("Testing Gemini API Connection...")
    console.log("API Key loaded:", key ? "YES (Starts with " + key.substring(0, 4) + ")" : "NO")

    if (!key) {
        console.error("ERROR: No API Key found in .env or .env.local")
        return
    }

    try {
        const { text } = await generateText({
            model: google("gemini-pro"),
            prompt: "Say 'Hello from Gemini' if you can hear me.",
        })
        console.log("SUCCESS! Response received:")
        console.log(text)
    } catch (error) {
        console.error("CONNECTION FAILED:")
        console.error(error)
    }
}

testConnection()
