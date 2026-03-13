import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale, BookOpen, PenLine, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import justiceLogo from "@/assets/justice-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Scale },
    { to: "/constitutions", label: "Constitutions", icon: BookOpen },
    { to: "/contribute", label: "Contribute", icon: PenLine },
    { to: "/ai-assistant", label: "AI Assistant", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={justiceLogo} alt="Ministry of Justice" className="h-10 w-10" />
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-nigeria-green leading-tight">Nigerian Justice League</p>
            <p className="text-xs text-muted-foreground leading-tight">Nigerian Constitution Review Platform</p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Button
                variant={isActive(l.to) ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Button>
            </Link>
          ))}
          <Link to="/admin/login">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              <Button variant={isActive(l.to) ? "default" : "ghost"} className="w-full justify-start gap-2">
                <l.icon className="h-4 w-4" />
                {l.label}
              </Button>
            </Link>
          ))}
          <Link to="/admin/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full">Admin Login</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
