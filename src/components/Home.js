import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';
import ServerIcon from "../ServerIcon";
import discordWhite from './images/discordWhite.png';
import { PlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Channel from "../Channel";
import image1 from './images/image1.png';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <> 
    {!user && navigate("/")}
         <div className="flex h-screen">
              <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
                  <div className="server-default  rounded-full bg-gray-500 hover:bg-discord_purple">
                     <a href="/channels">
                        <img src={discordWhite} alt="" className="h-7" />
                     </a>
                  </div>
                <hr className="border-gray-700 border w-8 mx-auto" />
                <ServerIcon 
                  image={image3}
                />
                <ServerIcon 
                  image={image2}
                />
                <ServerIcon 
                  image={image1}
                />
                <ServerIcon 
                  image={image4}
                />
                <ServerIcon 
                  image={image5}
                />
                <div className="server-default hover:bg-discord_green group">
                  <PlusIcon className="text-discord_green h-7 group-hover:text-white" />
                </div> 
              </div>

              <div className="bg-discord_channelBg flex flex-col min-w-max">
                <h2 className="flex text-white font-bold text-sm items-center
                 justify-between border-b border-gray-800 p-4 hover:bg-discord_serverHoverNameBg
                 cursor-pointer">Official JOEYCODES Server...
                 <ChevronDownIcon className="h-5 ml-2"/> 
                </h2>
                <div className="text-discord_channelText flex-grow overflow-y-scroll scrollbar-hide">
                   <div className="flex items-center p-2 mb-2">
                     <ChevronDownIcon className="h-3 mr-2"/>
                      <h4 className="font-semibold">Channels</h4>
                      <PlusIcon className="h-6 ml-auto cursor-pointer hover:text-white"/>
                   </div>
                   <div className="flex flex-col space-y-2 px-2 mb-4">
                   <Channel className="mb-12"/>
                   </div>
                </div>
              </div>
           </div>              
    </>
    
  )
}

export default Home;