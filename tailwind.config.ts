import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
        background: "#f1f5f9",
        surface: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
