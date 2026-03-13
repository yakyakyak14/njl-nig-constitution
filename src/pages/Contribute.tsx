import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { nigerianStatesAndLGAs } from "@/data/nigerianStates";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Upload, Check, ChevronsUpDown, FileText, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import JusticeWatermark from "@/components/JusticeWatermark";
import type { Tables } from "@/integrations/supabase/types";

type Constitution = Tables<"constitutions">;
type Chapter = Tables<"constitution_chapters">;

const schema = z.object({
  contributor_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  contributor_nin: z.string().trim().regex(/^\d{11}$/, "NIN must be exactly 11 digits"),
  contributor_state: z.string().min(1, "Please select your state"),
  contributor_lga: z.string().min(1, "Please select your LGA"),
  constitution_id: z.string().uuid("Please select a constitution"),
  chapter_id: z.string().uuid("Please select a chapter").optional(),
  review_text: z.string().trim().min(20, "Review must be at least 20 characters").max(5000),
});

type FormValues = z.infer<typeof schema>;

const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.txt,.rtf,.odt";

const Contribute = () => {
  const [constitutions, setConstitutions] = useState<Constitution[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [chapterOpen, setChapterOpen] = useState(false);
  const [chapterSearch, setChapterSearch] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contributor_name: "",
      contributor_nin: "",
      contributor_state: "",
      contributor_lga: "",
      constitution_id: "",
      chapter_id: undefined,
      review_text: "",
    },
  });

  const selectedState = form.watch("contributor_state");
  const selectedConstitutionId = form.watch("constitution_id");

  useEffect(() => {
    supabase.from("constitutions").select("*").order("year", { ascending: false }).then(({ data }) => {
      setConstitutions(data || []);
    });
  }, []);

  useEffect(() => {
    if (selectedConstitutionId) {
      supabase
        .from("constitution_chapters")
        .select("*")
        .eq("constitution_id", selectedConstitutionId)
        .order("chapter_number")
        .then(({ data }) => setChapters(data || []));
    } else {
      setChapters([]);
    }
  }, [selectedConstitutionId]);

  const lgas = nigerianStatesAndLGAs.find((s) => s.state === selectedState)?.lgas || [];

  const filteredChapters = chapters.filter(
    (ch) =>
      ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
      ch.chapter_number.toString().includes(chapterSearch)
  );

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      let file_url: string | null = null;
      let file_name: string | null = null;

      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("contributions").upload(path, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("contributions").getPublicUrl(path);
        file_url = urlData.publicUrl;
        file_name = file.name;
      }

      const insertData: any = {
        contributor_name: values.contributor_name,
        contributor_nin: values.contributor_nin,
        contributor_state: values.contributor_state,
        contributor_lga: values.contributor_lga,
        constitution_id: values.constitution_id,
        review_text: values.review_text,
        file_url,
        file_name,
      };
      if (values.chapter_id) insertData.chapter_id = values.chapter_id;

      const { error } = await supabase.from("contributions").insert(insertData);

      if (error) throw error;

      toast({ title: "Contribution Submitted!", description: "Thank you for your review. It will be reviewed by the Ministry." });
      form.reset();
      setFile(null);
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <JusticeWatermark />
      <div className="relative z-10 container py-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-2">Contribute to the Constitution Review</h1>
        <p className="text-muted-foreground mb-8">
          Share your thoughts on any chapter of the Nigerian constitution. Your contribution will be reviewed by the Nigerian Justice League.
        </p>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Submission Form</CardTitle>
            <CardDescription>All fields marked are required. Your NIN is for identity verification only.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField control={form.control} name="contributor_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* NIN */}
                <FormField control={form.control} name="contributor_nin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIN (National Identification Number) *</FormLabel>
                    <FormControl><Input placeholder="Enter 11-digit NIN" maxLength={11} {...field} /></FormControl>
                    <FormDescription>Your NIN is kept confidential and used for verification only.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* State */}
                <FormField control={form.control} name="contributor_state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <Select onValueChange={(v) => { field.onChange(v); form.setValue("contributor_lga", ""); }} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nigerianStatesAndLGAs.map((s) => (
                          <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* LGA */}
                <FormField control={form.control} name="contributor_lga" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Government Area *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder={selectedState ? "Select your LGA" : "Select a state first"} /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lgas.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Constitution */}
                <FormField control={form.control} name="constitution_id" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constitution *</FormLabel>
                    <Select onValueChange={(v) => { field.onChange(v); form.setValue("chapter_id", undefined); }} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select constitution to review" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {constitutions.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.title} ({c.year})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Chapter with searchable dropdown */}
                <FormField control={form.control} name="chapter_id" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Chapter (Optional)</FormLabel>
                    <Popover open={chapterOpen} onOpenChange={setChapterOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                            disabled={!selectedConstitutionId}
                          >
                            {field.value
                              ? chapters.find((ch) => ch.id === field.value)?.title || "Select chapter"
                              : selectedConstitutionId
                              ? "Search or select a chapter..."
                              : "Select a constitution first"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Type chapter name or number..."
                            value={chapterSearch}
                            onValueChange={setChapterSearch}
                          />
                          <CommandList>
                            <CommandEmpty>No chapter found.</CommandEmpty>
                            <CommandGroup>
                              {filteredChapters.map((ch) => (
                                <CommandItem
                                  key={ch.id}
                                  value={ch.title}
                                  onSelect={() => {
                                    field.onChange(ch.id);
                                    setChapterOpen(false);
                                    setChapterSearch("");
                                  }}
                                >
                                  <Check className={cn("mr-2 h-4 w-4", field.value === ch.id ? "opacity-100" : "opacity-0")} />
                                  <span className="font-medium mr-2">Ch. {ch.chapter_number}:</span> {ch.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Start typing to search chapters like Google suggestions.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Review Text */}
                <FormField control={form.control} name="review_text" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review / Contribution *</FormLabel>
                    <FormControl><Textarea rows={6} placeholder="Write your review or contribution here..." {...field} /></FormControl>
                    <FormDescription>{field.value.length}/5000 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* File Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Upload Supporting Document (Optional)</label>
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileRef.current?.click()}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept={ACCEPTED_FILE_TYPES}
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {file ? (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload PDF, DOC, DOCX, TXT, RTF, or ODT
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={submitting}>
                  <Send className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit Contribution"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contribute;
