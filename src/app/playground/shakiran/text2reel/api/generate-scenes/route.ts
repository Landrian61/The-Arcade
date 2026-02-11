import { NextResponse } from 'next/server'
import { z } from 'zod'
import { GoogleGenerativeAI } from '@google/generative-ai'

const RequestSchema = z.object({
    prompt: z.string().min(1),
})

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { prompt } = RequestSchema.parse(body)

        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is not set')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const systemPrompt = `
      You are a video scene generator. Convert the user's description into a sequence of scenes for a social media video.
      Return strictly a JSON array of objects with the following schema:
      {
        "text": "short text overlay (max 5 words)",
        "duration": number (seconds, between 2 and 5),
        "color": "hex color code (valid 6-digit hex matching the mood)"
      }
      Do not wrap in markdown code blocks. Return only the JSON array.
      The video should be engaging and dynamic.
    `

        const result = await model.generateContent([systemPrompt, `User Description: ${prompt}`])
        const response = await result.response
        let text = response.text()

        // Cleanup potential markdown formatting
        text = text.replace(/```json/g, '').replace(/```/g, '').trim()

        try {
            const scenes = JSON.parse(text)
            return NextResponse.json({ scenes })
        } catch (e) {
            console.error('Failed to parse Gemini response:', text)
            return NextResponse.json(
                { error: 'Failed to generate valid scenes' },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}
