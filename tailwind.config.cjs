module.exports = {
  content: [
    '*.html',
    './src/**/*.{ts,js,html,svelte}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
