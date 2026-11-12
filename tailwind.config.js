/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFC',
          100: '#FAF6F0',
          200: '#F2EAE0',
          300: '#E5D8C8',
          400: '#CFC0AE',
          500: '#AD9B87',
        },
        blush: {
          50: '#FCF6F5',
          100: '#F6E9E6',
          200: '#EBD3CE',
          300: '#DCB3AA',
          400: '#C8897C',
          500: '#B45F50',
          600: '#9B4B3D',
          700: '#7D3B30',
        },
        lavender: {
          50: '#F9F7FC',
          100: '#F0ECF7',
          200: '#E1D8EE',
          300: '#C9B9DF',
          400: '#A992C8',
          500: '#8A6EB0',
          600: '#6F5494',
          700: '#584176',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E6EDE6',
          200: '#CFDDD0',
          300: '#ADC4B0',
          400: '#84A488',
          500: '#5C7F62',
          600: '#46644B',
          700: '#374F3B',
        },
        terracotta: {
          50: '#FCF5F2',
          100: '#F7E7E0',
          200: '#EED0C3',
          300: '#DFAC96',
          400: '#CB7F62',
          500: '#B55B3C',
          600: '#96462B',
        },
        gold: {
          50: '#FDFBF6',
          100: '#F8F1E0',
          200: '#EFE0BC',
          300: '#E2C88E',
          400: '#CFA95C',
          500: '#B58B3B',
          600: '#916D2B',
        },
        cocoa: {
          500: '#7C6D68',
          600: '#5F514C',
          700: '#463A36',
          800: '#2E2522',
          900: '#1D1614',
        }
      },
      fontFamily: {
        // Fraunces is a soft, plump, friendly rounded-serif (cute & 100% legible)
        serif: ['"Fraunces"', '"Nunito"', 'Georgia', 'serif'],
        // Nunito + Plus Jakarta Sans gives a warm, rounded, super clear reading experience
        sans: ['"Nunito"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 12px 32px -8px rgba(29, 22, 20, 0.05), 0 4px 12px -2px rgba(29, 22, 20, 0.03)',
        'soft-hover': '0 20px 44px -10px rgba(29, 22, 20, 0.09), 0 8px 20px -4px rgba(180, 95, 80, 0.06)',
        'polaroid': '0 24px 48px -12px rgba(29, 22, 20, 0.08), 0 4px 16px -4px rgba(29, 22, 20, 0.04)',
        'sticker': '0 10px 24px -4px rgba(180, 95, 80, 0.28)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
