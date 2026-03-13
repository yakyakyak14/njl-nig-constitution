import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
