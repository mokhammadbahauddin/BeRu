// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['VT323_400Regular'],
        ui: ['Quicksand_500Medium'],
        cute: ['Fredoka_400Regular'],
        hand: ['PatrickHand_400Regular']
      },
      colors: {
        bebek: {
          bg: '#E0F2FE',
          primary: '#38BDF8',
          dark: '#0C4A6E',
          accent: '#F472B6',
          action: '#FDE047',
          calm: '#A7F3D0',
          surface: '#ffffff'
        }
      },
    },
  },
  plugins: [],
}
