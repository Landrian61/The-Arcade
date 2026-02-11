import { NextResponse } from 'next/server'
import { z } from 'zod'
import Groq from 'groq-sdk'

const RequestSchema = z.object({
    prompt: z.string().min(1),
})

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { prompt } = RequestSchema.parse(body)

        if (!process.env.GROQ_API_KEY) {
            console.error('GROQ_API_KEY is not set')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        const systemPrompt = `
      You are a video scene generator. Convert the user's description into a sequence of scenes for a social media video.
      Return strictly a JSON array of objects with the following schema:
      [
        {
          "text": "short text overlay (max 5 words)",
          "duration": number (seconds, between 2 and 5),
          "color": "hex color code (valid 6-digit hex)"
        }
      ]
      Prefer colors that match the mood of the user's vision.

      Return ONLY the JSON. No conversational text.
    `

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' }
        })

        const responseText = chatCompletion.choices[0]?.message?.content || '[]'

        try {
            const data = JSON.parse(responseText)
            // If the model wraps it in an object like { "scenes": [...] }, extract it
            const scenes = Array.isArray(data) ? data : (data.scenes || data.video_scenes || [])
            return NextResponse.json({ scenes })
        } catch (e) {
            console.error('Failed to parse Groq response:', responseText)
            return NextResponse.json(
                { error: 'Failed to generate valid scenes' },
                { status: 500 }
            )
        }

    } catch (error: any) {
        console.error('API Error Details:', {
            error,
            message: error?.message || 'Unknown error',
        })
        return NextResponse.json(
            { error: error?.message || 'Invalid request' },
            { status: 400 }
        )
    }
}
