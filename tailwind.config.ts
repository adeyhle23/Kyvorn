import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        charcoal: {
          DEFAULT: "#161616",
          light: "#1f1f1f",
          raised: "#262626",
        },
        steel: "#3a3a38",
        bone: {
          DEFAULT: "#e8e6e0",
          dim: "#a3a099",
          faint: "#6b6862",
        },
        rust: {
          DEFAULT: "#c2410c",
          dark: "#8f2f0a",
          light: "#e2632c",
        },
      },
      fontFamily: {
        headline: ["var(--font-headline)"],
        body: ["var(--font-body)"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        widest: "0.28em",
      },
      backgroundImage: {
        grain: "url('/textures/grain.svg')",
        topo: "url('/textures/topo.svg')",
        grid: "url('/textures/grid.svg')",
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
