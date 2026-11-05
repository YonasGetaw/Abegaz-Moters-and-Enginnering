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
          DEFAULT: '#0F172A',
          dark: '#090D16',
          slate: '#1E293B',
          card: '#162238',
          deep: '#060A12',
        },
        slate: {
          850: '#151F30',
          900: '#0F172A',
        },
        orange: {
          signal: '#F97316',
          deep: '#C2410C',
          tint: '#FFF7ED',
          light: '#FED7AA',
        },
        mist: '#F8FAFC',
        line: '#E2E8F0',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Ethiopic', 'Nyala', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Noto Sans Ethiopic', 'sans-serif'],
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
