import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Heart, Brain } from "lucide-react";

export const Route = createFileRoute("/educativo")({
  head: () => ({
    meta: [
      { title: "Aprender — Bloom" },
      { name: "description", content: "Conteúdo educativo sobre emoções, alimentação e fome emocional para jovens." },
    ],
  }),
  component: Educativo,
});

const TOPICS = [
  {
    icon: Heart,
    title: "Emoções e alimentação",
    text: "Comer é mais do que nutrição. Nossas emoções influenciam o que escolhemos comer — e o que comemos também influencia como nos sentimos. Quando a gente entende essa conexão, fica mais fácil cuidar de si com gentileza.",
  },
  {
    icon: Brain,
    title: "O que são impulsos alimentares",
    text: "É aquela vontade súbita e intensa de comer algo, mesmo sem fome real. Costumam aparecer em momentos de estresse, tédio ou tristeza. Não são vilões — são sinais de que algo precisa de atenção.",
  },
  {
    icon: BookOpen,
    title: "Fome emocional vs. fome física",
    text: "A fome física aparece aos poucos, aceita várias opções e some quando a gente come. Já a emocional surge de repente, pede algo específico (geralmente doce ou crocante) e não some mesmo depois de comer. Reconhecer ajuda a escolher melhor.",
  },
];

const COMPARE = [
  { fisica: "Aparece aos poucos", emocional: "Surge de repente" },
  { fisica: "Aceita várias opções", emocional: "Quer algo específico" },
  { fisica: "Vai embora ao saciar", emocional: "Persiste mesmo cheia" },
  { fisica: "Sem culpa depois", emocional: "Pode vir culpa ou desconforto" },
];

function Educativo() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/40 text-sage-deep text-xs font-semibold uppercase tracking-wide">
          <BookOpen className="h-3.5 w-3.5" /> Aprender
        </span>
        <h1 className="font-display text-5xl text-sage-deep mt-4">
          Entenda o que acontece dentro de você
        </h1>
        <p className="text-foreground/70 mt-3 max-w-2xl mx-auto">
          Conteúdos curtos e leves para entender melhor a relação entre emoções, fome e autocuidado.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        {TOPICS.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-3xl bg-card border border-border/60 p-7 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-peach-soft flex items-center justify-center">
                <Icon className="h-5 w-5 text-sage-deep" />
              </div>
              <h2 className="font-display text-2xl text-sage-deep">{title}</h2>
            </div>
            <p className="mt-3 text-foreground/75 leading-relaxed">{text}</p>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-3xl bg-warm p-7 md:p-10 shadow-petal">
        <h2 className="font-display text-3xl text-sage-deep text-center">
          Fome física vs. fome emocional
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-sage-deep px-2">🌿 Física</div>
            {COMPARE.map((c) => (
              <div key={c.fisica} className="rounded-2xl bg-card/80 px-4 py-3">
                {c.fisica}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-sage-deep px-2">💭 Emocional</div>
            {COMPARE.map((c) => (
              <div key={c.emocional} className="rounded-2xl bg-card/80 px-4 py-3">
                {c.emocional}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
