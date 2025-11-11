/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        StopD: ["StopD"],
      },
      animation: {
        "shiny-text": "shiny-text 8s infinite",
        gradient: "gradient 8s linear infinite",
        shine: "shine 3s linear infinite",
        ripple: "ripple 2s ease-in-out infinite",
        grid: "grid 3s ease-in-out infinite",
        "background-position-spin":
          "background-position-spin 6s ease-in-out infinite",
        "line-shadow": "line-shadow 15s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          "50%": {
            backgroundPosition: "100% 100%",
          },
          "100%": {
            backgroundPosition: "0% 0%",
          },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        grid: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "background-position-spin": {
          "0%": {
            backgroundPosition: "top center",
          },
          "100%": {
            backgroundPosition: "bottom center",
          },
        },
        "shiny-text": {
          "0%, 90%, 100%": {
            backgroundPosition: "calc(-100% - var(--shiny-width)) 0",
          },
          "30%, 60%": {
            backgroundPosition: "calc(100% + var(--shiny-width)) 0",
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size, 300%) 0",
          },
        },
        "line-shadow": {
          "0%": {
            "background-position": "0 0",
          },
          "100%": {
            "background-position": "100% -100%",
          },
        },
      },
    },
  },
  plugins: [],
};
