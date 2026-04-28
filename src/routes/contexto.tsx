import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getState, setState } from "@/lib/bloom-store";
import { Step } from "./emocoes";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/contexto")({
  head: () => ({
    meta: [
      { title: "Personalizando para você — Bloom" },
      { name: "description", content: "Personalize as sugestões alimentares de acordo com seu momento." },
    ],
  }),
  component: Contexto,
});

function Contexto() {
  const navigate = useNavigate();
  const [ate, setAte] = useState<boolean | undefined>();
  const [taste, setTaste] = useState<"doce" | "salgado" | "tanto-faz" | undefined>();
  const [effort, setEffort] = useState<"rapido" | "elaborado" | undefined>();

  useEffect(() => {
    const s = getState();
    setAte(s.ateToday);
    setTaste(s.taste);
    setEffort(s.effort);
  }, []);

  const next = () => {
    setState({ ateToday: ate, taste, effort });
    navigate({ to: "/resultados" });
  };

  const can = ate !== undefined && taste && effort;

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <Step current={3} total={4} />
      <h1 className="font-display text-4xl md:text-5xl text-sage-deep text-center mt-6">
        Quase lá! ✨
      </h1>
      <p className="text-center text-foreground/70 mt-3">
        Só mais alguns detalhes para personalizar suas sugestões.
      </p>

      <Block label="Já comeu hoje?">
        <Pair
          value={ate === undefined ? undefined : ate ? "sim" : "nao"}
          onChange={(v) => setAte(v === "sim")}
          options={[
            { value: "sim", label: "Sim 🌿" },
            { value: "nao", label: "Ainda não 🌅" },
          ]}
        />
      </Block>

      <Block label="Prefere doce ou salgado?">
        <Pair
          value={taste}
          onChange={(v) => setTaste(v as typeof taste)}
          options={[
            { value: "doce", label: "Doce 🍓" },
            { value: "salgado", label: "Salgado 🥑" },
            { value: "tanto-faz", label: "Tanto faz 💛" },
          ]}
        />
      </Block>

      <Block label="Quer algo rápido ou mais elaborado?">
        <Pair
          value={effort}
          onChange={(v) => setEffort(v as typeof effort)}
          options={[
            { value: "rapido", label: "Rápido ⚡" },
            { value: "elaborado", label: "Elaborado 🍳" },
          ]}
        />
      </Block>

      <div className="mt-10 flex justify-center">
        <button
          onClick={next}
          disabled={!can}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-petal disabled:opacity-50 hover:bg-primary/90"
        >
          Ver sugestões <Sparkles className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <label className="block font-display text-xl text-sage-deep mb-3">{label}</label>
      {children}
    </div>
  );
}

function Pair({
  value,
  onChange,
  options,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-2xl px-4 py-4 border-2 transition-all font-medium ${
              active
                ? "bg-primary/30 border-primary text-sage-deep"
                : "bg-card border-border hover:border-primary/50 text-foreground/80"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
