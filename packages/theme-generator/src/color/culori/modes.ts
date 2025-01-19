import { modeLch, modeLrgb, useMode } from "culori/fn";

// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
useMode(modeLch); // required by chroma clamping
// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
useMode(modeLrgb); // required by contrast calculations

export { modeLch, modeLrgb };
