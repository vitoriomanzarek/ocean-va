import dotenv from "dotenv"

dotenv.config({ path: '.env.local' })
const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
    console.log("Fetching models from:", url.replace(key, "HIDDEN_KEY"))

    try {
        const res = await fetch(url)
        const data = await res.json()

        if (data.models) {
            console.log("AVAILABLE MODELS:")
            data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`))
        } else {
            console.error("NO MODELS FOUND. Response:", JSON.stringify(data, null, 2))
        }
    } catch (e) {
        console.error("FETCH ERROR:", e)
    }
}

listModels()
