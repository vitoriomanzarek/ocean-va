async function testServer() {
    console.log("Sending request to http://localhost:3000/api/chat...")
    try {
        const res = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hello server' }]
            })
        })

        console.log("Status:", res.status)
        if (!res.ok) {
            console.log("Error Body:", await res.text())
        } else {
            // It's a stream, so just read a bit
            const reader = res.body.getReader()
            const { value } = await reader.read()
            console.log("Stream received chunk:", new TextDecoder().decode(value))
        }
    } catch (e) {
        console.error("Request Failed:", e)
    }
}

testServer()
