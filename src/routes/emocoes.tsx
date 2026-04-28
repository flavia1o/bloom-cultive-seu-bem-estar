import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getState, setState, type Emotion } from "@/lib/bloom-store";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/emocoes")({
  head: () => ({
    meta: [
      { title: "Como você está se sentindo? — Bloom" },
      { name: "description", content: "Identifique suas emoções para iniciar sua jornada de autocuidado." },
    ],
  }),
  component: Emocoes,
});

const OPTIONS: { value: Emotion; label: string; emoji: string; tone: string }[] = [
  { value: "ansioso", label: "Ansioso(a)", emoji: "🌀", tone: "bg-blush/40" },
  { value: "triste", label: "Triste", emoji: "🌧️", tone: "bg-secondary/40" },
  { value: "feliz", label: "Feliz", emoji: "🌸", tone: "bg-mustard/40" },
  { value: "estressado", label: "Estressado(a)", emoji: "🔥", tone: "bg-primary/30" },
  { value: "cansado", label: "Cansado(a)", emoji: "🌙", tone: "bg-peach-soft" },
  { value: "outro", label: "Outro", emoji: "✨", tone: "bg-cream" },
];

function Emocoes() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Emotion[]>([]);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    const s = getState();
    if (s.emotions) setSelected(s.emotions);
    if (s.customEmotion) setCustom(s.customEmotion);
  }, []);

  const toggle = (e: Emotion) => {
    setSelected((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));
  };

  const next = () => {
    setState({ emotions: selected, customEmotion: custom });
    navigate({ to: "/reflexao" });
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <Step current={1} total={4} />
      <h1 className="font-display text-4xl md:text-5xl text-sage-deep text-center mt-6">
        Como você está se sentindo agora?
      </h1>
      <p className="text-center text-foreground/70 mt-3">
        Pode escolher mais de uma — todas as emoções são bem-vindas.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {OPTIONS.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={`group rounded-3xl p-6 text-left transition-all border-2 shadow-soft hover:-translate-y-1 ${
                active
                  ? "bg-primary/30 border-primary scale-[1.02]"
                  : `${opt.tone} border-transparent hover:border-primary/50`
              }`}
            >
              <div className="text-4xl">{opt.emoji}</div>
              <div className="mt-3 font-display text-xl text-sage-deep">{opt.label}</div>
            </button>
          );
        })}
      </div>

      {selected.includes("outro") && (
        <input
          type="text"
          value={custom}
          maxLength={60}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="Conta pra gente como está se sentindo..."
          className="mt-5 w-full rounded-2xl border border-border bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}

      <div className="mt-8 rounded-2xl bg-secondary/30 p-5 text-center text-sage-deep italic">
        “Reconhecer o que você sente é o primeiro passo para se cuidar.”
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={next}
          disabled={selected.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-petal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          Continuar <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Step({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i < current ? "bg-primary w-10" : "bg-border w-6"
          }`}
        />
      ))}
    </div>
  );
}
