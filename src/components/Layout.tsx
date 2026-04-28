import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/bloom-logo.png";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Início" },
  { to: "/emocoes", label: "Como me sinto" },
  { to: "/educativo", label: "Aprender" },
  { to: "/autocuidado", label: "Autocuidado" },
  { to: "/perfil", label: "Perfil" },
] as const;

export function Layout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-hero">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src={logo} alt="Bloom" className="h-11 w-11 object-contain" />
            <span className="font-display text-2xl text-sage-deep font-semibold">bloom</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    active
                      ? "bg-primary/30 text-sage-deep font-semibold"
                      : "text-foreground/70 hover:bg-peach-soft hover:text-sage-deep"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="md:hidden p-2 rounded-full hover:bg-peach-soft"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border/60 bg-background/95 px-5 py-3 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm hover:bg-peach-soft text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 py-10 border-t border-border/60 bg-background/40">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={logo} alt="Bloom" className="h-8 w-8 object-contain" />
            <span className="font-display text-xl text-sage-deep">bloom</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Conectando emoções, alimentação e autocuidado — para florescer todos os dias.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-4">
            © {new Date().getFullYear()} Bloom · Projeto educativo escolar
          </p>
        </div>
      </footer>
    </div>
  );
}
