import { themes } from "../themes";

const DEFAULT_THEMES = Object.keys(themes);

const DEFAULT_UTILITY_VALUES = {
  "--rounded-box": "1rem",
  "--rounded-btn": "0.5rem",
  "--rounded-badge": "1.9rem",
  "--animation-btn": "0.25s",
  "--animation-input": ".2s",
  "--btn-focus-scale": "0.95",
  "--border-btn": "1px",
  "--tab-border": "1px",
  "--tab-radius": "0.5rem",
  "--radius": "0.5rem",
  "--font-sans": "Inter",
  "--font-serif": "Lexend",
  "--font-mono": "Source Code Pro",
  "--border-angle": "0deg",
};

export { DEFAULT_THEMES, DEFAULT_UTILITY_VALUES };
