import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/bloom-logo.png";
import { Heart, Sparkles, Leaf, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom — Como você está se sentindo hoje?" },
      {
        name: "description",
        content:
          "Bloom é um espaço para conectar emoções e alimentação, cultivando autocuidado e bem-estar.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/40 text-sage-deep text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Bem-vinda(o) ao Bloom
            </span>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-sage-deep">
              Como você está se <em className="text-primary not-italic">sentindo</em> hoje?
            </h1>
            <p className="text-lg text-foreground/75 max-w-md">
              Um espaço acolhedor para escutar suas emoções, refletir sobre seus impulsos e
              descobrir alimentos que abraçam o seu bem-estar.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/emocoes"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-petal hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                Começar <Heart className="h-4 w-4" />
              </Link>
              <Link
                to="/educativo"
                className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-7 py-3.5 text-base font-semibold text-sage-deep hover:bg-peach-soft transition-all"
              >
                Saber mais
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-warm rounded-full blur-3xl opacity-60" />
            <img
              src={logo}
              alt="Logotipo Bloom"
              className="relative w-full max-w-md drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-sage-deep">Floresça por inteiro</h2>
          <p className="mt-3 text-foreground/70 max-w-xl mx-auto">
            Bloom une corpo, mente e necessidades em uma jornada simples de autoconhecimento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Heart,
              title: "Emoções",
              text: "Reconheça o que você sente — esse é sempre o primeiro passo.",
              tone: "bg-blush/30",
            },
            {
              icon: Brain,
              title: "Reflexão",
              text: "Pause antes de agir por impulso e ouça o que o corpo realmente pede.",
              tone: "bg-secondary/40",
            },
            {
              icon: Leaf,
              title: "Alimentação",
              text: "Descubra refeições que combinam com seu estado emocional, sem culpa.",
              tone: "bg-mustard/30",
            },
          ].map(({ icon: Icon, title, text, tone }) => (
            <div
              key={title}
              className="rounded-3xl bg-card p-7 shadow-soft border border-border/50 hover:-translate-y-1 transition-transform"
            >
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${tone} mb-4`}>
                <Icon className="h-6 w-6 text-sage-deep" />
              </div>
              <h3 className="font-display text-2xl text-sage-deep">{title}</h3>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-5 pb-20">
        <div className="rounded-3xl bg-warm p-10 md:p-14 text-center shadow-petal">
          <h2 className="font-display text-3xl md:text-4xl text-sage-deep">
            Pronta(o) para começar sua jornada?
          </h2>
          <p className="mt-3 text-foreground/75 max-w-lg mx-auto">
            São apenas alguns passos para entender o que seu corpo e mente pedem agora.
          </p>
          <Link
            to="/emocoes"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-deep px-7 py-3.5 text-white font-semibold hover:opacity-90"
            style={{ backgroundColor: "var(--sage-deep)", color: "var(--cream)" }}
          >
            Começar agora <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
