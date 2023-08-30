/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        10: "10px",
      },
      height: {
        100: "400px",
      },
      minHeight: {
        100: "400px",
      },
      boxShadow: {
        bold: "-8px 8px 0px 0px #000000",
      },
      borderColor: {
        DEFAULT: "#000000",
      },
      borderWidth: {
        1.5: "1.5px",
      },
      fontSize: {
        // display-{lg,md,sm} = {51/76, 48/56, 36/44}
        "d-lg": [
          "3.1875rem",
          {
            lineHeight: "4.75rem",
            letterSpacing: "-2px",
            fontWeight: 500,
          },
        ],
        "d-md": [
          "3rem",
          {
            lineHeight: "4rem",
            letterSpacing: "-1.5px",
            fontWeight: 500,
          },
        ],
        "d-sm": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-1px",
            fontWeight: 500,
          },
        ],
        // headline-{xl,lg,md,sm} = {32/38, 28/34, 24/28, 22/24}
        "h-xl": [
          "2rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: 0,
            fontWeight: 500,
          },
        ],
        "h-lg": [
          "1.75rem",
          {
            lineHeight: "2.125rem",
            letterSpacing: 0,
            fontWeight: 500,
          },
        ],
        "h-md": [
          "1.5rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: 0,
            fontWeight: 500,
          },
        ],
        "h-sm": [
          "1.375rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: 0,
            fontWeight: 500,
          },
        ],
        // title-{xl,lg,md,sm} = {20/28, 18/26, 16/22, 14/18}
        "t-xl": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: 0,
            fontWeight: 600,
          },
        ],
        "t-lg": [
          "1.125rem",
          {
            lineHeight: "1.625rem",
            letterSpacing: 0,
            fontWeight: 600,
          },
        ],
        "t-md": [
          "1rem",
          {
            lineHeight: "1.375rem",
            letterSpacing: "0.1px",
            fontWeight: 600,
          },
        ],
        "t-sm": [
          "0.875rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.1px",
            fontWeight: 600,
          },
        ],
        // label-{lg,md,sm} = {14/18, 12/16, 10/14}
        "l-lg": [
          "0.875rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.1px",
            fontWeight: 600,
          },
        ],
        "l-md": [
          "0.75rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0.25px",
            fontWeight: 600,
          },
        ],
        "l-sm": [
          "0.625rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "0.5px",
            fontWeight: 600,
          },
        ],
        // body-{lg,md,sm} = {16/24, 14/20, 12/18}
        "b-lg": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "0.15px",
            fontWeight: 500,
          },
        ],
        "b-md": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.2px",
            fontWeight: 500,
          },
        ],
        "b-sm": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.5px",
            fontWeight: 500,
          },
        ],
      },
      colors: {
        background: "#fafafa",
        secondary: "#E5E3D6",
        neutral: {
          50: "#F7F8F9",
          100: "#E8EBED",
          200: "#C9CDD2",
          400: "#9EA4AA",
          500: "#72787F",
          DEFAULT: "#72787F",
          600: "#454C53",
          800: "#26282B",
          900: "#1B1D1F",
          950: "#000000",
        },
        primary: {
          900: "#333300",
          800: "#666600",
          700: "#999900",
          600: "#CCCC00",
          500: "#FFFF00",
          DEFAULT: "#FFFF00",
          400: "#FFFF33",
          300: "#FFFF66",
          200: "#FFFF99",
          100: "#FFFFCC",
          50: "#FFFFE5",
        },
      },
    },
  },
  plugins: [],
}

