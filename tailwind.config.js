/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
        discord_channelHoverBg: "#3a3c43",
        discord_userSectionText: "#b9bbbe",
        discord_userSectionBg: "#292b2f",
        discord_userSectionIconHover: "#dcddde",
        discord_chatInputBg: "#40444b",
        discord_chatInputTxt: "#dcddde",
        discord_messageBg: "#32353b",
        discord_message: "#72767d",
        discord_deleteIcon: "#ed4245",
      },
      height: {
        "83vh": "83vh",
      },
      backgroundImage: {
        Discord3: "url('/public/img/Discord3.png')",
      },
      fontFamily: {
        "proxima-nova-bold": ["proxima-nova-bold", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
