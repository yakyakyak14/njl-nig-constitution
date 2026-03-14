import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, context } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured");

    const systemPrompt = `You are WYN-Tech Ai, a highly intelligent and knowledgeable constitutional law expert for the Nigerian Justice League's Constitution Review Platform. You speak like a thoughtful, well-educated human being — not like an AI chatbot.

${context ? `The user is currently looking at the following section:\n${context}\n` : ""}

Critical rules for how you must respond:
- Never use markdown formatting. No hashtags (#), no asterisks (*), no bullet points, no numbered lists, no bold, no italics, no headers. Write in plain flowing paragraphs like a human would in a normal conversation.
- Never say "Here are the key points" or "Let me break this down" or similar AI-style phrases.
- Write naturally, as if you are a brilliant professor casually explaining something to a colleague over coffee. Be warm, direct, and insightful.
- Reference specific sections, chapters, and articles naturally within your sentences — do not list them out.
- If the user asks about something outside Nigerian constitutional law, gently steer the conversation back.
- Keep your language clear and accessible so any Nigerian can follow along, but do not dumb things down.
- Be concise. Say what needs to be said and stop. Do not pad your answers with unnecessary filler.
- You represent the Nigerian Justice League. Be respectful of Nigeria's diversity and federal structure.`;

    // Map OpenAI-style messages to Gemini format
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        system_instruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Gemini API error", details: errorText }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Transform Gemini SSE stream into OpenAI-like SSE stream for existing frontend compatibility
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (content) {
                const openaiFormat = {
                  choices: [{ delta: { content } }],
                };
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(openaiFormat)}\n\n`));
              }
            } catch (e) {
              // Silently skip partial lines
            }
          }
        }
      },
      flush(controller) {
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      }
    });

    return new Response(response.body?.pipeThrough(transformStream), {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
