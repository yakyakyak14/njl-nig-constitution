import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import JusticeWatermark from "@/components/JusticeWatermark";
import type { Tables } from "@/integrations/supabase/types";

type Msg = { role: "user" | "assistant"; content: string };
type Constitution = Tables<"constitutions">;
type Chapter = Tables<"constitution_chapters">;

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/constitution-chat`;

const AIAssistant = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [constitutions, setConstitutions] = useState<Constitution[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedConstitution, setSelectedConstitution] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.from("constitutions").select("*").order("year", { ascending: false }).then(({ data }) => {
      setConstitutions(data || []);
      const paramConst = searchParams.get("constitution");
      if (paramConst) setSelectedConstitution(paramConst);
    });
  }, []);

  useEffect(() => {
    if (selectedConstitution) {
      supabase
        .from("constitution_chapters")
        .select("*")
        .eq("constitution_id", selectedConstitution)
        .order("chapter_number")
        .then(({ data }) => {
          setChapters(data || []);
          const paramChapter = searchParams.get("chapter");
          if (paramChapter) setSelectedChapter(paramChapter);
        });
    }
  }, [selectedConstitution]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getContext = () => {
    const constitution = constitutions.find((c) => c.id === selectedConstitution);
    const chapter = chapters.find((ch) => ch.id === selectedChapter);
    let ctx = "";
    if (constitution) ctx += `Constitution: ${constitution.title} (${constitution.year})\n`;
    if (chapter) ctx += `Chapter ${chapter.chapter_number}: ${chapter.title}\nContent:\n${chapter.content}\n`;
    return ctx;
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const context = getContext();
    const allMessages = [...messages, userMsg];

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages, context }),
      });

      if (resp.status === 429) {
        toast({ title: "Rate Limited", description: "Too many requests. Please wait a moment.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast({ title: "Service Unavailable", description: "AI service credits exhausted.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <JusticeWatermark />
      <div className="relative z-10 container py-6 flex-1 flex flex-col max-w-3xl">
        <h1 className="font-display text-2xl font-bold mb-2">AI Constitution Assistant</h1>
        <p className="text-muted-foreground text-sm mb-4">Select a constitution and chapter, then ask questions about it.</p>

        {/* Context selectors */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Select value={selectedConstitution} onValueChange={(v) => { setSelectedConstitution(v); setSelectedChapter(""); }}>
            <SelectTrigger className="sm:w-64">
              <SelectValue placeholder="Select Constitution" />
            </SelectTrigger>
            <SelectContent>
              {constitutions.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.title} ({c.year})</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedChapter} onValueChange={setSelectedChapter} disabled={!selectedConstitution}>
            <SelectTrigger className="sm:w-64">
              <SelectValue placeholder="Select Chapter (optional)" />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((ch) => (
                <SelectItem key={ch.id} value={ch.id}>Ch. {ch.chapter_number}: {ch.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Messages */}
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                <div>
                  <Bot className="h-12 w-12 mx-auto mb-3 text-primary/40" />
                  <p className="text-lg font-display">Ask me anything about Nigerian constitutions</p>
                  <p className="text-sm mt-1">Select a constitution above for more focused analysis.</p>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`rounded-lg p-3 max-w-[80%] ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none text-foreground">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{m.content}</p>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </CardContent>
        </Card>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Ask a question about the constitution..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            disabled={isLoading}
          />
          <Button onClick={send} disabled={isLoading || !input.trim()} className="gap-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
