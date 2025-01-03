import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#CCCCCC',
            'h1, h2, h3, h4, h5, h6': {
              color: '#FFFFFF',
              fontWeight: '600',
            },
            a: {
              color: '#007ACC',
              '&:hover': {
                color: '#1F8DD6',
              },
            },
            code: {
              color: '#E06C75',
              backgroundColor: '#2C2C2C',
              padding: '0.2em 0.4em',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1E1E1E',
              color: '#CCCCCC',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
            blockquote: {
              borderLeftColor: '#3C3C3C',
              color: '#8C8C8C',
            },
            hr: {
              borderColor: '#3C3C3C',
            },
            'ul > li::before': {
              backgroundColor: '#6B6B6B',
            },
            'ol > li::before': {
              color: '#6B6B6B',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;