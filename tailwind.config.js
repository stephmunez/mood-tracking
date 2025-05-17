/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "neutral-900": "#21214d",
        "neutral-600": "#57577b",
        "neutral-300": "#9393b7",
        "neutral-200": "#cbcdd0",
        "neutral-0": "#ffffff",
        "blue-700": "#2a4cd5",
        "blue-600": "#4865db",
        "blue-300": "#89caff",
        "blue-200": "#c7d3f7",
        "blue-100": "#e0e6fa",
        "red-700": "#e60013",
        "red-300": "#ff9b99",
        "indigo-200": "#b8b1ff",
        "green-300": "#89e780",
        "amber-300": "#ffc97c",
      },
    },
  },
  plugins: [],
};
