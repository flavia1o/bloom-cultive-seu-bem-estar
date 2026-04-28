import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getState, setState } from "@/lib/bloom-store";
import { recommend, type Suggestion } from "@/lib/recommendations";
import { Step } from "./emocoes";
import { Bookmark, BookmarkCheck, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title: "Suas sugestões — Bloom" },
      { name: "description", content: "Sugestões alimentares personalizadas para o seu momento emocional." },
    ],
  }),
  component: Resultados,
});

const CAT_LABEL: Record<Suggestion["category"], { name: string; tone: string }> = {
  leve: { name: "Leves", tone: "bg-secondary/40" },
  energetico: { name: "Energéticos", tone: "bg-mustard/40" },
  calmante: { name: "Calmantes", tone: "bg-blush/40" },
};

function Resultados() {
  const [saved, setSaved] = useState<string[]>([]);
  const [list, setList] = useState<Suggestion[]>([]);

  useEffect(() => {
    const s = getState();
    setSaved(s.saved ?? []);
    setList(recommend(s));
  }, []);

  const grouped = useMemo(() => {
    return (["calmante", "energetico", "leve"] as const)
      .map((c) => ({ cat: c, items: list.filter((s) => s.category === c) }))
      .filter((g) => g.items.length);
  }, [list]);

  const toggleSave = (name: string) => {
    const next = saved.includes(name) ? saved.filter((n) => n !== name) : [...saved, name];
    setSaved(next);
    setState({ saved: next });
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <Step current={4} total={4} />
      <h1 className="font-display text-4xl md:text-5xl text-sage-deep text-center mt-6">
        Sugestões pensadas para você 🌿
      </h1>
      <p className="text-center text-foreground/70 mt-3 max-w-xl mx-auto">
        Lembre-se: é sobre <strong>equilíbrio</strong>, não restrição. Escolha o que faz sentido pra você agora.
      </p>

      {grouped.map(({ cat, items }) => (
        <section key={cat} className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold text-sage-deep ${CAT_LABEL[cat].tone}`}>
              {CAT_LABEL[cat].name}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {items.map((s) => (
              <article
                key={s.name}
                className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-4xl">{s.emoji}</div>
                  <button
                    onClick={() => toggleSave(s.name)}
                    aria-label="Salvar sugestão"
                    className="p-2 rounded-full hover:bg-peach-soft transition-colors"
                  >
                    {saved.includes(s.name) ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5 text-foreground/50" />
                    )}
                  </button>
                </div>
                <h3 className="font-display text-2xl text-sage-deep mt-3">{s.name}</h3>
                <p className="text-foreground/70 mt-1 text-sm">{s.description}</p>
                <div className="mt-4 rounded-2xl bg-secondary/25 p-3 text-sm text-sage-deep">
                  💡 {s.why}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-12 flex flex-wrap gap-3 justify-center">
        <Link
          to="/emocoes"
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-6 py-3 font-medium hover:bg-peach-soft"
        >
          <RotateCcw className="h-4 w-4" /> Recomeçar
        </Link>
        <Link
          to="/autocuidado"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-petal hover:bg-primary/90"
        >
          Dicas de autocuidado
        </Link>
      </div>
    </div>
  );
}
