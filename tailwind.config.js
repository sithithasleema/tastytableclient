/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cookie: ["Cookie", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        delius: ["Delius", "cursive"],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        "accent-1": "var(--accent-color-1)",
        "primary-text": "var(--primary-text)",
      },
      fontSize: {
        header: "var(--main-header)",
        "sub-heading": "var(--side-header)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
