/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      keyframes: {
        pull: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        pull: 'pull 0.3s ease-in-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
