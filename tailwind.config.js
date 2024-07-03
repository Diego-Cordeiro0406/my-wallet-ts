/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "app-background": "url(src/assets/foto_fundo.png), linear-gradient(to right, rgb(47,193,140), rgb(47,193,140))",
      },
    },
    screens: {
      'mobile': '360px',
      // => @media (min-width: 360px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      'others': '1600px'
      // => @media (min-width: 1600px) { ... }
    },
  },
  plugins: [],
}

