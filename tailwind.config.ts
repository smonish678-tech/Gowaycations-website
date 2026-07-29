import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { orange: "#ff941c", forest: "#516131", ink: "#111111", mist: "#f8f8f8" }, fontFamily: { montserrat: ["var(--font-montserrat)", "sans-serif"] } } }, plugins: [] } satisfies Config;
