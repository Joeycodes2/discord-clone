import React from "react"; 
import { Bars3Icon } from "@heroicons/react/24/outline";
import discordlogo from "./images/discordlogo.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import {auth, googleProvider} from "./firebase";


function Header() {
   const [user] = useAuthState(auth);
   const navigate = useNavigate(); 

   const signIn = (e) => {    
      auth
      .signInWithPopup(googleProvider)
      .then(() => navigate("/Channels"))
      // .catch((error) => alert("error.message"));
      e.preventDefault();   
   };

  return (
    <div>
      <header className="bg-discord_blue flex justify-between py-4 px-12 ">
         <a href="/">
         <img 
         src={discordlogo}
          className="w-28 h-12 object-contain"
          alt=""
         />
         </a>
         <div className="hidden text-white lg:flex space-x-10 items-center">
          <a href="/" className="link">Download</a>
          <a href="/" className="link">Nitro</a>
          <a href="/" className="link">Discover</a>
          <a href="/" className="link">Safety</a>
          <a href="/" className="link">Support</a>
          <a href="/" className="link">Blog</a>
          <a href="/" className="link">Careers</a>
         </div>
         <div className="flex space-x-4">
          <button className="bg-white p-2 rounded-full text-xs md:text-sm
          px-4 focus:outline-none hover:shadow-2xl 
          hover:text-discord_blurple transition duration-200 ease-in-out 
          whitespace-nowrap font-medium" 
          onCLick={!user ? signIn : navigate("/Channels")}
          >{!user ? "Login" : "Open Discord"}</button> 
          <Bars3Icon class="h-9 text-white cursor-pointer lg:hidden" />
         </div>
    </header>
    </div>
  )
}

export default Header;

