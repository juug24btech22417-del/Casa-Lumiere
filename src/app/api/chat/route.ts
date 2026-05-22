import { NextResponse } from 'next/server';
import { nvidia, LAND_ASSISTANT_SYSTEM_PROMPT } from '@/lib/nvidia';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // Prepare the conversation history for NVIDIA (OpenAI format)
    const chatHistory = [
      { role: 'system', content: LAND_ASSISTANT_SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const completion = await nvidia.chat.completions.create({
      model: 'deepseek-ai/deepseek-v4-flash', // Switched to 70B for 10x faster response times
      messages: chatHistory,
      temperature: 0.7,
      max_tokens: 500,
    });

    let content = completion.choices[0].message.content || 'I apologize, I am unable to process your request at this moment.';

    console.log("LLM Output:", content); // Debug: see what the LLM actually output

    // Check for lead qualification block (make regex more forgiving)
    const leadMatch = content.match(/<LEAD>([\s\S]*?)<\/LEAD>/i);
    if (leadMatch) {
      console.log("Lead block found! Extracting...", leadMatch[1]);
      try {
        const leadData = JSON.parse(leadMatch[1].trim());
        console.log("Parsed lead data:", leadData);

        // Save to Supabase via REST API
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              name: leadData.name || '',
              phone: leadData.phone || '',
              budget: leadData.budget || '',
              timeline: leadData.timeline || '',
              source: 'AI Assistant',
            })
          });

          console.log("Supabase insertion status:", res.status, res.statusText);
          if (!res.ok) {
            const errText = await res.text();
            console.error("Supabase error response:", errText);
          } else {
            const data = await res.json();
            console.log("Supabase returned data:", data);
          }
        } else {
          console.error("Missing Supabase credentials in env vars.");
        }
      } catch (e) {
        console.error("Failed to parse JSON or save lead:", e);
      }
      // Remove the hidden block from the user's view (including possible markdown code blocks)
      content = content.replace(/```json\s*<LEAD>[\s\S]*?<\/LEAD>\s*```/i, '').trim();
      content = content.replace(/<LEAD>[\s\S]*?<\/LEAD>/i, '').trim();
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('NVIDIA API Error:', error);
    return NextResponse.json(
      { content: 'I apologize, but my connection to the estate records is currently interrupted.' },
      { status: 500 }
    );
  }
}
