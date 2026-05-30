import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        bg: {
          0: "#080b12",
          1: "#0d1117",
          2: "#111620",
          3: "#161c28",
          4: "#1c2333",
        },
        border: {
          DEFAULT: "#1e2a3a",
          2: "#243040",
        },
        text: {
          1: "#e8edf5",
          2: "#8b96a8",
          3: "#4a5568",
        },
        accent: {
          blue: "#3b82f6",
          indigo: "#6366f1",
          purple: "#8b5cf6",
          green: "#10b981",
          amber: "#f59e0b",
          coral: "#f43f5e",
          teal: "#14b8a6",
        },
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
