import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, BookOpen, ChevronRight, Calendar, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import JusticeWatermark from "@/components/JusticeWatermark";
import type { Tables } from "@/integrations/supabase/types";

type Constitution = Tables<"constitutions">;
type Chapter = Tables<"constitution_chapters">;
type Amendment = Tables<"constitution_amendments">;

const Constitutions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [constitutions, setConstitutions] = useState<Constitution[]>([]);
  const [selectedConstitution, setSelectedConstitution] = useState<Constitution | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConstitutions();
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id && constitutions.length) {
      const found = constitutions.find((c) => c.id === id);
      if (found) selectConstitution(found);
    }
  }, [searchParams, constitutions]);

  const loadConstitutions = async () => {
    const { data } = await supabase
      .from("constitutions")
      .select("*")
      .order("year", { ascending: false });
    setConstitutions(data || []);
    setLoading(false);
  };

  const selectConstitution = async (c: Constitution) => {
    setSelectedConstitution(c);
    setSearchParams({ id: c.id });

    // Log view
    await supabase.from("constitution_views").insert({ constitution_id: c.id });

    const [chaptersRes, amendmentsRes] = await Promise.all([
      supabase.from("constitution_chapters").select("*").eq("constitution_id", c.id).order("chapter_number"),
      supabase.from("constitution_amendments").select("*").eq("constitution_id", c.id).order("amendment_number"),
    ]);
    setChapters(chaptersRes.data || []);
    setAmendments(amendmentsRes.data || []);
  };

  const filtered = constitutions.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.year.toString().includes(search)
  );

  const filteredChapters = chapters.filter(
    (ch) =>
      !search ||
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      ch.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <JusticeWatermark />
      <div className="relative z-10 container py-6 md:py-8 px-4 md:px-8">
        <h1 className="font-display text-2xl md:text-4xl font-bold mb-2">Nigerian Constitutions</h1>
        <p className="text-muted-foreground mb-6">Browse, search, and quote from all Nigerian constitutions.</p>

        {/* Search */}
        <div className="relative w-full max-w-xl mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search constitutions, chapters, or sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {!selectedConstitution ? (
          /* List view */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6 h-40" />
                  </Card>
                ))
              : filtered.map((c) => (
                  <Card
                    key={c.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-border hover:border-primary/50"
                    onClick={() => selectConstitution(c)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-primary border-primary">
                          {c.year}
                        </Badge>
                        <Badge variant={c.status === "active" ? "default" : "secondary"}>
                          {c.status}
                        </Badge>
                      </div>
                      <CardTitle className="font-display text-lg mt-2">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                      {c.effective_date && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Effective: {c.effective_date}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
          </div>
        ) : (
          /* Detail view */
          <div>
            <Button variant="ghost" className="mb-4 gap-1" onClick={() => { setSelectedConstitution(null); setSearchParams({}); }}>
              ← Back to all constitutions
            </Button>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-primary border-primary">{selectedConstitution.year}</Badge>
                  <Badge variant={selectedConstitution.status === "active" ? "default" : "secondary"}>
                    {selectedConstitution.status}
                  </Badge>
                </div>
                <CardTitle className="font-display text-2xl">{selectedConstitution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedConstitution.description}</p>
                {selectedConstitution.effective_date && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Effective Date: {selectedConstitution.effective_date}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Chapters */}
            {filteredChapters.length > 0 && (
              <div className="mb-6">
                <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" /> Chapters
                </h2>
                <Accordion type="multiple" className="space-y-2">
                  {filteredChapters.map((ch) => (
                    <AccordionItem key={ch.id} value={ch.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                            {ch.chapter_number}
                          </span>
                          <div>
                            <p className="font-semibold">{ch.title}</p>
                            {ch.section_range && (
                              <p className="text-xs text-muted-foreground">Sections {ch.section_range}</p>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {ch.part && <p className="text-sm font-medium text-primary mb-2">{ch.part}</p>}
                        <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                          {ch.content}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${selectedConstitution.title}, Chapter ${ch.chapter_number}: ${ch.title}\n\n${ch.content}`
                              );
                            }}
                          >
                            Copy Quote
                          </Button>
                          <a href={`/ai-assistant?constitution=${selectedConstitution.id}&chapter=${ch.id}`}>
                            <Button size="sm" variant="ghost" className="text-primary">
                              Analyze with AI
                            </Button>
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Amendments */}
            {amendments.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Amendments</h2>
                <div className="space-y-3">
                  {amendments.map((a) => (
                    <Card key={a.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{a.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                            {a.contributors && (
                              <p className="text-xs text-muted-foreground mt-1">Contributors: {a.contributors}</p>
                            )}
                          </div>
                          {a.date_enacted && (
                            <Badge variant="outline" className="text-xs flex-shrink-0">
                              {a.date_enacted}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Constitutions;
