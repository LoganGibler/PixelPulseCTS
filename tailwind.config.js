/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // "sm-": "px",
      xxs: "450px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      "sm+": "700px",
      md: "768px",
      // => @media (min-width: 768px) { ... }
      "md+": "815px",
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
