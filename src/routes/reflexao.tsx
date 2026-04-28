import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getState, setState } from "@/lib/bloom-store";
import { Step } from "./emocoes";
import { ArrowRight, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/reflexao")({
  head: () => ({
    meta: [
      { title: "Pausa para refletir — Bloom" },
      { name: "description", content: "Reflita sobre fome física vs. emocional antes de agir por impulso." },
    ],
  }),
  component: Reflexao,
});

function Reflexao() {
  const navigate = useNavigate();
  const [hunger, setHunger] = useState<"fisica" | "emocional" | "duvida" | undefined>();
  const [last, setLast] = useState<"menos1h" | "1a3h" | "3a5h" | "mais5h" | undefined>();
  const [craving, setCraving] = useState("");

  useEffect(() => {
    const s = getState();
    setHunger(s.hungerType);
    setLast(s.lastMeal);
    setCraving(s.craving ?? "");
  }, []);

  const next = () => {
    setState({ hungerType: hunger, lastMeal: last, craving });
    navigate({ to: "/contexto" });
  };

  const can = hunger && last;

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <Step current={2} total={4} />
      <h1 className="font-display text-4xl md:text-5xl text-sage-deep text-center mt-6">
        Vamos pausar um instante
      </h1>
      <p className="text-center text-foreground/70 mt-3 max-w-xl mx-auto">
        Respire fundo. Essas perguntas ajudam você a entender o que seu corpo realmente pede.
      </p>

      <Field label="Você está com fome física ou emocional?">
        <Choices
          value={hunger}
          onChange={(v) => setHunger(v as typeof hunger)}
          options={[
            { value: "fisica", label: "Fome física", emoji: "🍽️" },
            { value: "emocional", label: "Emocional", emoji: "💭" },
            { value: "duvida", label: "Não sei", emoji: "🤍" },
          ]}
        />
      </Field>

      <Field label="Faz quanto tempo desde sua última refeição?">
        <Choices
          value={last}
          onChange={(v) => setLast(v as typeof last)}
          options={[
            { value: "menos1h", label: "< 1h", emoji: "⏱️" },
            { value: "1a3h", label: "1–3h", emoji: "🕐" },
            { value: "3a5h", label: "3–5h", emoji: "🕓" },
            { value: "mais5h", label: "+5h", emoji: "🕔" },
          ]}
        />
      </Field>

      <Field label="Você sente vontade de comer algo específico?">
        <input
          type="text"
          value={craving}
          maxLength={80}
          onChange={(e) => setCraving(e.target.value)}
          placeholder="Ex: chocolate, salgadinho, pão..."
          className="w-full rounded-2xl border border-border bg-card px-5 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </Field>

      <div className="mt-8 rounded-2xl bg-mustard/25 p-5 flex gap-3">
        <Lightbulb className="h-5 w-5 text-sage-deep shrink-0 mt-0.5" />
        <p className="text-sm text-sage-deep leading-relaxed">
          <strong>Sabia?</strong> Impulsos alimentares costumam aparecer em momentos de estresse,
          tristeza ou tédio. Reconhecê-los é poder escolher com mais carinho — sem culpa, sem regras rígidas.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={next}
          disabled={!can}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-petal disabled:opacity-50 hover:bg-primary/90"
        >
          Continuar <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <label className="block font-display text-xl text-sage-deep mb-3">{label}</label>
      {children}
    </div>
  );
}

function Choices({
  value,
  onChange,
  options,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; emoji: string }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-2xl px-4 py-4 text-center border-2 transition-all ${
              active
                ? "bg-primary/30 border-primary"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <div className="text-2xl">{o.emoji}</div>
            <div className="text-sm mt-1 text-sage-deep font-medium">{o.label}</div>
          </button>
        );
      })}
    </div>
  );
}
