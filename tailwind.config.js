/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#1D242B',
        'secondary': '#002049',
        'tertiary' :'#F3F3F3',
      },
      backgroundImage: {
        "hero-bg": "url('/Hero.png')"
      },
      fontFamily: {
        montserrat: `"Montserrat", sans-serif; @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap" rel="stylesheet');`,
      },
    },
  },
  plugins: [],
}
