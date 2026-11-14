import type { Config } from "tailwindcss";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  // Hover styles only apply on devices that can hover — no "stuck" hover states after a tap on phones
  future: { hoverOnlyWhenSupported: true },
  content:["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        background: token("background"),
        surface: token("surface"),
        card: token("card"),
        foreground: token("foreground"),
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        forest: token("forest"),
        brass: { DEFAULT: token("brass"), ink: token("brass-ink"), light: token("brass-light") },
        oxblood: token("oxblood"),
        ivory: token("ivory"),
      },
      maxWidth: { "8xl": "88rem" },
    },
  },
  plugins: [],
};

export default config;
