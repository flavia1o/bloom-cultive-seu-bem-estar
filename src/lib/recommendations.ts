import type { BloomState } from "./bloom-store";

export interface Suggestion {
  name: string;
  category: "leve" | "energetico" | "calmante";
  description: string;
  why: string;
  emoji: string;
}

const ALL: Suggestion[] = [
  {
    name: "Banana com aveia e mel",
    category: "calmante",
    description: "Banana amassada com aveia e um fio de mel.",
    why: "A banana auxilia na produção de serotonina, melhorando o humor e trazendo sensação de calma.",
    emoji: "🍌",
  },
  {
    name: "Iogurte com frutas vermelhas",
    category: "leve",
    description: "Iogurte natural com morangos e mirtilos.",
    why: "Probióticos do iogurte e antioxidantes das frutas ajudam a regular o humor e reduzir a ansiedade.",
    emoji: "🫐",
  },
  {
    name: "Chá de camomila com torrada integral",
    category: "calmante",
    description: "Chá morno com uma fatia de pão integral e geleia.",
    why: "A camomila relaxa o sistema nervoso, ideal em momentos de estresse ou ansiedade.",
    emoji: "🍵",
  },
  {
    name: "Mix de castanhas e frutas secas",
    category: "energetico",
    description: "Punhado de castanhas, amêndoas e damascos.",
    why: "Magnésio e gorduras boas que dão energia estável e ajudam o cérebro a focar.",
    emoji: "🥜",
  },
  {
    name: "Sanduíche de abacate",
    category: "energetico",
    description: "Pão integral com abacate, tomate e uma pitada de sal.",
    why: "Gorduras saudáveis do abacate sustentam a energia e ajudam o humor.",
    emoji: "🥑",
  },
  {
    name: "Salada colorida com grão-de-bico",
    category: "leve",
    description: "Folhas, tomate-cereja, pepino e grão-de-bico.",
    why: "Refeição leve e nutritiva que evita o desconforto do exagero e mantém o foco.",
    emoji: "🥗",
  },
  {
    name: "Chocolate 70% com morangos",
    category: "calmante",
    description: "Pequenos pedaços de chocolate amargo com morangos frescos.",
    why: "O chocolate amargo libera endorfinas e traz sensação de prazer sem excesso de açúcar.",
    emoji: "🍫",
  },
  {
    name: "Smoothie de banana e cacau",
    category: "energetico",
    description: "Banana, leite, cacau em pó e um pouco de aveia.",
    why: "Combina triptofano e magnésio — ótimos aliados para o bom humor.",
    emoji: "🥤",
  },
  {
    name: "Maçã com pasta de amendoim",
    category: "leve",
    description: "Fatias de maçã com uma colher de pasta de amendoim integral.",
    why: "Fibras + proteína mantêm a saciedade e estabilizam a glicose.",
    emoji: "🍎",
  },
];

export function recommend(state: BloomState): Suggestion[] {
  let pool = [...ALL];

  if (state.taste === "doce") {
    pool = pool.filter((s) => ["🍌", "🫐", "🍫", "🥤", "🍎"].includes(s.emoji));
  } else if (state.taste === "salgado") {
    pool = pool.filter((s) => ["🥜", "🥑", "🥗", "🍵"].includes(s.emoji));
  }

  if (state.effort === "rapido") {
    pool = pool.filter((s) => !s.name.toLowerCase().includes("smoothie") || true);
  }

  const wantsCalm =
    state.emotions?.some((e) => ["ansioso", "estressado", "triste"].includes(e));
  const wantsEnergy = state.emotions?.includes("cansado");

  if (wantsCalm) {
    pool.sort((a, b) => (a.category === "calmante" ? -1 : 1));
  } else if (wantsEnergy) {
    pool.sort((a, b) => (a.category === "energetico" ? -1 : 1));
  }

  return pool.slice(0, 6);
}
