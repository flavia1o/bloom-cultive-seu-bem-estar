import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { clearState, getState, setState, type BloomState } from "@/lib/bloom-store";
import { Trash2, Heart } from "lucide-react";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Bloom" },
      { name: "description", content: "Suas preferências, sugestões salvas e histórico emocional." },
    ],
  }),
  component: Perfil,
});

const EMO_LABEL: Record<string, string> = {
  ansioso: "Ansioso(a) 🌀",
  triste: "Triste 🌧️",
  feliz: "Feliz 🌸",
  estressado: "Estressado(a) 🔥",
  cansado: "Cansado(a) 🌙",
  outro: "Outro ✨",
};

function Perfil() {
  const [s, setS] = useState<BloomState>({ emotions: [] });

  useEffect(() => {
    setS(getState());
  }, []);

  const removeSaved = (name: string) => {
    const next = (s.saved ?? []).filter((n) => n !== name);
    setS(setState({ saved: next }));
  };

  const reset = () => {
    clearState();
    setS({ emotions: [] });
  };

  const hasData = (s.emotions?.length ?? 0) > 0 || (s.saved?.length ?? 0) > 0;

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="font-display text-5xl text-sage-deep text-center">Meu jardim 🌿</h1>
      <p className="text-center text-foreground/70 mt-3">
        Aqui ficam suas preferências, emoções recentes e sugestões favoritas.
      </p>

      {!hasData && (
        <div className="mt-10 rounded-3xl bg-card border border-dashed border-border p-10 text-center">
          <p className="text-foreground/70">Você ainda não começou sua jornada.</p>
          <Link
            to="/emocoes"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-petal hover:bg-primary/90"
          >
            Começar agora <Heart className="h-4 w-4" />
          </Link>
        </div>
      )}

      {hasData && (
        <>
          <Card title="Como me senti recentemente">
            <div className="flex flex-wrap gap-2">
              {(s.emotions ?? []).map((e) => (
                <span key={e} className="px-3 py-1.5 rounded-full bg-secondary/40 text-sm text-sage-deep">
                  {EMO_LABEL[e] ?? e}
                </span>
              ))}
              {s.customEmotion && (
                <span className="px-3 py-1.5 rounded-full bg-blush/40 text-sm text-sage-deep">
                  “{s.customEmotion}”
                </span>
              )}
            </div>
          </Card>

          <Card title="Minhas preferências">
            <ul className="space-y-2 text-foreground/80 text-sm">
              {s.taste && <li>Gosto: <strong className="text-sage-deep">{s.taste}</strong></li>}
              {s.effort && <li>Tempo de preparo: <strong className="text-sage-deep">{s.effort}</strong></li>}
              {s.hungerType && <li>Tipo de fome mais recente: <strong className="text-sage-deep">{s.hungerType}</strong></li>}
              {s.lastMeal && <li>Última refeição: <strong className="text-sage-deep">{s.lastMeal}</strong></li>}
            </ul>
          </Card>

          <Card title="Sugestões salvas">
            {(s.saved?.length ?? 0) === 0 ? (
              <p className="text-sm text-muted-foreground">Você ainda não salvou nenhuma sugestão.</p>
            ) : (
              <ul className="space-y-2">
                {s.saved!.map((name) => (
                  <li
                    key={name}
                    className="flex items-center justify-between rounded-2xl bg-peach-soft px-4 py-3"
                  >
                    <span className="text-sage-deep">{name}</span>
                    <button
                      onClick={() => removeSaved(name)}
                      className="p-1.5 rounded-full hover:bg-background"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4 text-foreground/60" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <div className="mt-10 text-center">
            <button
              onClick={reset}
              className="text-sm text-muted-foreground hover:text-destructive underline underline-offset-4"
            >
              Limpar meus dados
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-3xl bg-card border border-border/60 p-6 shadow-soft">
      <h2 className="font-display text-2xl text-sage-deep mb-4">{title}</h2>
      {children}
    </section>
  );
}
