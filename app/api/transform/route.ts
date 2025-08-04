import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { url, speaker1, speaker2, mode, viewStyle } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    const chatContent = await fetchChatContent(url)
    const result = await transformContent(chatContent, {
      speaker1: speaker1 || 'Human',
      speaker2: speaker2 || 'AI',
      mode,
      viewStyle,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Transform error:', error)
    return NextResponse.json(
      { error: 'Failed to transform content' },
      { status: 500 }
    )
  }
}

async function fetchChatContent(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    const html = await response.text()
    
    // Extract content from ChatGPT share pages
    const contentMatch = html.match(/<div[^>]*class="[^"]*markdown[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)
    if (contentMatch) {
      return contentMatch.join('\n\n')
    }
    
    // Fallback: extract text content
    const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    return textContent
  } catch (error) {
    throw new Error('Failed to fetch ChatGPT content')
  }
}

async function transformContent(
  content: string,
  options: {
    speaker1: string
    speaker2: string
    mode: 'blog' | 'transcript'
    viewStyle: 'vertical' | 'cards'
  }
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
  
  const prompt = `
You are an expert content transformer. Transform the following ChatGPT conversation into ${options.mode === 'blog' ? 'a structured blog post' : 'a clean transcript'}.

Conversation:
${content}

Speaker names: ${options.speaker1} and ${options.speaker2}

Requirements:
${options.mode === 'blog'
  ? `- Create a structured blog post with:
  - Compelling title
  - Subtitle
  - Summary (2-3 sentences)
  - Relevant tags (3-5 tags)
  - 3-5 sections with clear headings and content
  - Use HTML formatting for better presentation`
  : `- Create a clean transcript with:
  - Alternating speakers (${options.speaker1} and ${options.speaker2})
  - Preserve the conversation flow
  - Clean up any formatting issues
  - Use HTML formatting for better presentation`
}

Return the result as a JSON object with this structure:
${options.mode === 'blog'
  ? `{
  "blog": {
    "title": "string",
    "subtitle": "string",
    "summary": "string",
    "tags": ["string"],
    "sections": [
      {
        "title": "string",
        "content": "string (HTML formatted)"
      }
    ]
  }
}`
  : `{
  "transcript": [
    {
      "speaker": "string",
      "message": "string (HTML formatted)",
      "timestamp": "string (optional)"
    }
  ]
}`
}

Make sure the content is engaging, well-structured, and ready for publication.
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      // Fallback response if JSON parsing fails
      return options.mode === 'blog'
        ? {
            blog: {
              title: 'Transformed Conversation',
              subtitle: 'A structured version of the chat',
              summary: 'This content has been transformed from a ChatGPT conversation into a structured format.',
              tags: ['conversation', 'transformed', 'content'],
              sections: [
                {
                  title: 'Overview',
                  content: `<p>${text}</p>`
                }
              ]
            }
          }
        : {
            transcript: [
              {
                speaker: options.speaker1,
                message: `<p>${text}</p>`
              }
            ]
          }
    } catch (error) {
      throw new Error('Failed to parse AI response')
    }
  } catch (error) {
    console.error('AI transformation error:', error)
    throw new Error('Failed to transform content with AI')
  }
} 