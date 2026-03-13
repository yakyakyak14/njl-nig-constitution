import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, PenLine, MessageSquare, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import JusticeWatermark from "@/components/JusticeWatermark";
import justiceLogo from "@/assets/justice-logo.png";

const features = [
  {
    icon: BookOpen,
    title: "Browse Constitutions",
    description: "Access all Nigerian constitutions from 1922 to present, with full chapter breakdowns.",
    link: "/constitutions",
    cta: "Browse Now",
  },
  {
    icon: Search,
    title: "Search & Quote",
    description: "Find specific sections related to your issue and quote directly from the constitution.",
    link: "/constitutions",
    cta: "Search",
  },
  {
    icon: PenLine,
    title: "Contribute Reviews",
    description: "Submit your review on any chapter of the constitution for consideration by the Ministry.",
    link: "/contribute",
    cta: "Contribute",
  },
  {
    icon: MessageSquare,
    title: "WYN-Tech Ai",
    description: "Use AI to analyze and understand specific chapters or sections of any constitution.",
    link: "/ai-assistant",
    cta: "Ask AI",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <JusticeWatermark />

      {/* Hero */}
      <section className="relative z-10 overflow-hidden">
        <div className="container py-10 md:py-24 flex flex-col items-center text-center">
          <motion.img
            src={justiceLogo}
            alt="Ministry of Justice Nigeria"
            className="w-36 h-36 md:w-48 md:h-48 mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.2 }}
          />
          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground max-w-4xl leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Nigerian Justice League
          </motion.h1>
          <motion.h2
            className="mt-2 text-xl md:text-3xl font-medium text-primary max-w-3xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Nigerian Constitution Review Platform
          </motion.h2>
          <motion.p
            className="mt-4 text-base md:text-xl text-muted-foreground max-w-2xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Access, search, and contribute to the review of Nigeria's constitutions.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/constitutions">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" /> Browse Constitutions
              </Button>
            </Link>
            <Link to="/contribute">
              <Button size="lg" variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <PenLine className="h-5 w-5" /> Make a Contribution
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 bg-muted/50 py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i + 0.8 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1 mb-4">{f.description}</p>
                    <Link to={f.link}>
                      <Button variant="ghost" size="sm" className="gap-1 text-primary p-0 hover:bg-transparent hover:underline">
                        {f.cta} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nigerian Justice League. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
