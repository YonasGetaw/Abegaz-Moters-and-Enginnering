/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1E3A8A',
          dark: '#172554',
          slate: '#1E40AF',
          card: '#1E3A8A',
          deep: '#0F172A',
        },
        brand: {
          blue: '#1D4ED8',
          blueDark: '#1E3A8A',
          red: '#DC2626',
          redDark: '#B91C1C',
        },
        orange: {
          signal: '#DC2626',
          deep: '#B91C1C',
          tint: '#FEF2F2',
          light: '#FECACA',
        },
        mist: '#F8FAFC',
        line: '#E2E8F0',
        muted: '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Ethiopic', 'Nyala', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Noto Sans Ethiopic', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(11,25,44,0.06)',
        md: '0 8px 24px rgba(11,25,44,0.08)',
        lg: '0 20px 48px rgba(11,25,44,0.14)',
        blue: '0 10px 25px -5px rgba(29, 78, 216, 0.3)',
      },
      borderRadius: {
        input: '10px',
        btn: '12px',
        card: '16px',
        banner: '24px',
      }
    },
  },
  plugins: [],
}
