import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import discordlogo from "./images/discordlogo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <header className="bg-discord_blue flex justify-between py-4 px-12 ">
        <a href="/">
          <img
            src={discordlogo}
            className="w-28 h-12 object-contain"
            alt="DiscordLogo"
          />
        </a>
        <div className="hidden text-white lg:flex space-x-10 items-center">
          <a href="https://discord.com/download" className="link">
            Download
          </a>
          <a href="https://discord.gift/" className="link">
            Nitro
          </a>
          <a
            href="https://support.discord.com/hc/en-us/articles/360023968311-Server-Discovery"
            className="link"
          >
            Discover
          </a>
          <a
            href="https://support.discord.com/hc/en-us/categories/115000168351-Trust-Safety"
            className="link"
          >
            Safety
          </a>
          <a href="https://support.discord.com/hc/en-us" className="link">
            Support
          </a>
          <a href="https://discord.com/blog" className="link">
            Blog
          </a>
          <a href="https://discord.com/careers" className="link">
            Careers
          </a>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-white p-2 rounded-full text-xs md:text-sm
          px-4 focus:outline-none hover:shadow-2xl 
          hover:text-discord_blurple transition duration-200 ease-in-out 
          whitespace-nowrap font-medium"
            onClick={!user ? signIn : () => navigate("/channels")}
          >
            {!user ? "Login" : "Open Discord"}
          </button>
          <Bars3Icon className="h-9 text-white cursor-pointer lg:hidden" />
        </div>
      </header>
    </div>
  );
}

export default Header;
