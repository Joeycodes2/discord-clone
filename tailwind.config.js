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
        discord_serverBg: "#36393f",
        discord_serversBg: "#202225",
        discord_channelBg: "#2f3136",
        discord_serverHoverNameBg: "#34373c",
        discord_channelText: "#8e9297",
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
  plugins: [require('tailwind-scrollbar-hide')],
};
