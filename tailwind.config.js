/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    './src/**/*.{js,jsx,ts,tsx,vue}',
    "./pages/*.vue",
    "./components/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}