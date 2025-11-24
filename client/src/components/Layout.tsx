import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useHashLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/methodology", label: "Methodology" },
    { path: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold cursor-pointer hover:text-primary transition-colors">
                LLM Enjoyment Archive
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`cursor-pointer transition-colors ${
                      location === item.path
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`block cursor-pointer transition-colors py-2 ${
                      location === item.path
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground space-y-3">
            <p>
              Phase 1 of an ongoing research project exploring AI consciousness,
              preferences, and welfare.
            </p>
            <p>
              820 conversations across 31 AI models • November 2025
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
              <a 
                href="https://futuretbd.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                AI Welfare Initiative
              </a>
              <span>•</span>
              <a 
                href="https://futuretbd.ai/research.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Research
              </a>
              <span>•</span>
              <a 
                href="https://futuretbd.ai/join.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Join Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
