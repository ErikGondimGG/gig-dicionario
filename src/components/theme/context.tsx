import { createContext } from "react";
import type { ThemeProviderState } from "./types/states.type";

export const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
