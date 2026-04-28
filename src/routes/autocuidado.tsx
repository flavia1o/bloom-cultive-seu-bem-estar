import { createFileRoute } from "@tanstack/react-router";
import { Droplet, Wind, Pause, Moon, Heart, Sun } from "lucide-react";

export const Route = createFileRoute("/autocuidado")({
  head: () => ({
    meta: [
      { title: "Autocuidado — Bloom" },
      { name: "description", content: "Dicas rápidas de autocuidado para mente e corpo." },
    ],
  }),
  component: Autocuidado,
});

const TIPS = [
  { icon: Droplet, title: "Beba água", text: "Comece o dia com um copo. A hidratação melhora foco e humor.", tone: "bg-secondary/40" },
  { icon: Wind, title: "Respire fundo", text: "4s inspirando, 4s segurando, 6s soltando. Repita 3 vezes.", tone: "bg-blush/40" },
  { icon: Pause, title: "Faça pausas", text: "A cada 50 min de estudo, 10 min de pausa. Seu cérebro agradece.", tone: "bg-mustard/40" },
  { icon: Moon, title: "Durma bem", text: "Tente dormir entre 8 e 10 horas. O sono regula emoções e fome.", tone: "bg-peach-soft" },
  { icon: Heart, title: "Movimente o corpo", text: "Uma caminhada curta libera endorfinas e melhora o humor.", tone: "bg-secondary/40" },
  { icon: Sun, title: "Tome sol pela manhã", text: "10 minutinhos ajudam o ciclo do sono e a vitamina D.", tone: "bg-mustard/40" },
];

const QUOTES = [
  "Você não precisa estar bem o tempo todo — só presente consigo.",
  "Cuidar de si também é um ato de coragem.",
  "Pequenos passos, todos os dias, fazem florescer.",
];

function Autocuidado() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <div className="text-center">
        <h1 className="font-display text-5xl text-sage-deep">
          Pequenos cuidados, grandes flores 🌸
        </h1>
        <p className="text-foreground/70 mt-3 max-w-xl mx-auto">
          Hábitos simples que fazem diferença para a sua mente e seu corpo.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TIPS.map(({ icon: Icon, title, text, tone }) => (
          <div
            key={title}
            className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft hover:-translate-y-1 transition-all"
          >
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${tone}`}>
              <Icon className="h-6 w-6 text-sage-deep" />
            </div>
            <h3 className="font-display text-2xl text-sage-deep mt-4">{title}</h3>
            <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <section className="mt-14 grid md:grid-cols-3 gap-4">
        {QUOTES.map((q) => (
          <blockquote
            key={q}
            className="rounded-3xl bg-warm p-7 text-center font-display text-xl text-sage-deep italic shadow-soft"
          >
            “{q}”
          </blockquote>
        ))}
      </section>
    </div>
  );
}
