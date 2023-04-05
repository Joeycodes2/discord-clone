/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord_blue: "#295DE7",
        discord_blurple: "#7289da",
        discord_purple: "#5865f2",
        discord_green: "#3ba55c",
      },
      height: {
        "83vh": "83vh"
      },
      backgroundImage: {
        'Discord3': "url('/public/img/Discord3.png')" 
      },
        fontFamily: {
            'proxima-nova-bold': ['proxima-nova-bold', 'Arial', 'sans-serif'],        
        },
    },
  },
  plugins: [],
};
