import { createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-sage-deep">404</h1>
        <h2 className="mt-2 font-display text-2xl">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Essa flor ainda não desabrochou por aqui.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bloom — Emoções, alimentação e autocuidado" },
      {
        name: "description",
        content:
          "Bloom conecta emoções e alimentação para promover bem-estar físico e mental em jovens.",
      },
      { property: "og:title", content: "Bloom — Floresça com autocuidado" },
      {
        property: "og:description",
        content: "Identifique emoções, reflita sobre impulsos e encontre alimentos que cuidam de você.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: Layout,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
