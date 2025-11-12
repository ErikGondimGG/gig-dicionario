import { ThemeProvider } from "@/components/theme/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import LoginPage from "./pages/login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
