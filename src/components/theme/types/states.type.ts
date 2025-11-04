import type { Theme } from "./themes.type";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
