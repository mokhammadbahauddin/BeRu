// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter_400Regular'],
        mono: ['JetBrainsMono_400Regular'],
      },
      colors: {
        // Zinc colors are default in Tailwind but ensuring they are available
      },
    },
  },
  plugins: [],
}
