module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          green: {
            DEFAULT: '#3B7A57', // Organic green
            light: '#5FA877',
            dark: '#26543C',
          },
          brown: {
            DEFAULT: '#D2B48C', // Light brown (tan)
            light: '#EAD7B7',
            dark: '#A67C52',
          },
        },
      },
    },
  },
  plugins: [],
}; 