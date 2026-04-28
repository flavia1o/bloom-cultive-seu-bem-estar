// Simple session-scoped store using localStorage
export type Emotion = "ansioso" | "triste" | "feliz" | "estressado" | "cansado" | "outro";

export interface BloomState {
  emotions: Emotion[];
  customEmotion?: string;
  hungerType?: "fisica" | "emocional" | "duvida";
  lastMeal?: "menos1h" | "1a3h" | "3a5h" | "mais5h";
  craving?: string;
  ateToday?: boolean;
  taste?: "doce" | "salgado" | "tanto-faz";
  effort?: "rapido" | "elaborado";
  saved?: string[];
}

const KEY = "bloom-state";

export function getState(): BloomState {
  if (typeof window === "undefined") return { emotions: [] };
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as BloomState;
  } catch {
    return { emotions: [] };
  }
}

export function setState(patch: Partial<BloomState>) {
  const current = getState();
  const next = { ...current, ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearState() {
  localStorage.removeItem(KEY);
}
