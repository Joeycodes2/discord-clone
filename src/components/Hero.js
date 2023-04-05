import React from 'react'
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Discord from "./Discord.js";
import Discord1 from "./Discord1.js";

function Hero() {
  return (
    <div className="bg-Discord3 bg-cover bg-center bg-discord_blue pb-8 md:pb-0
    ">
    <div className="hidden lg:absolute lg:flex -mr-44 -right-44 p-28 pr-14 pt-48 -mt-2 
    mb-28 justify-right transition duration-200 ease-in-out">
          <Discord1 className=""/>
      </div>
    <div className="p-4 py-4 h-screen md:h-83vh md:flex lg:justify-center items-center">    
      <div className="space-y-9 gap-7 md:max-w-md h-80 lg:max-w-none lg:justify-center
       items-center">
        <h1 className="font-proxima-nova font-black text-6xl text-white  items-center justify-center lg:max-w-4xl
        tracking-wide text-center">
              IMAGINE A PLACE...
        </h1>
        <h2 className="text-white text-base tracking-wide items-center lg:justify-center 
            lg:max-w-3xl w-full text-center">
            ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy 
            to talk every day and hang out more often.
        </h2>
        <div className="flex flex-col items-center justify-center sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6">
        <button className="bg-white w-70 font-medium flex items-center justify-center rounded-full 
        p-4 text-lg hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out focus:outline-none">
        <ArrowDownTrayIcon className="w-6 mr-2"/>
        Download for Windows
        </button>
        <button className="bg-gray-900 text-white w-72 font-medium flex items-center 
        justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:bg-gray-800 
        focus:outline-none transition duration-200 ease-in-out">Open Discord in your browser</button>
        </div>
       </div> 
       <div className="lg:absolute h-16 w-3 -left-40 -ml-44 -p-28 mb-28 mt-4
       justify-left sm:items-right -sm:pb-56 sm:justify-right transition duration-200 ease-in-out">
        <Discord className=""/>
       </div>
      </div>
      
      </div>
  )
}

export default Hero;