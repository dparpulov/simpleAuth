/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        customOrange: '#FC9B7E',
        customGrayDark: '#464646',
        customGrayDarker: '#373737',
        customGrayMedium: '#696969',
      },
      boxShadow: {
        'custom-black': '8px 8px 20px 0px rgba(0, 0, 0, 0.25)'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}

