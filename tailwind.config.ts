import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f2742",
        teal: "#0e9488",
        sky: "#dff3f8",
        coral: "#d95f5f",
        clinical: "#f5f8fb"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 39, 66, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
