import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import ServerIcon from "../ServerIcon";
import discordWhite from "./images/discordWhite.png";
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  MicrophoneIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import Channel from "../Channel";
// import image1 from "./images/image1.png";
import image2 from "./images/image2.jpg";
// import image3 from "./images/image3.jpg";
// import image4 from "./images/image4.jpg";
import image5 from "./images/image5.jpg";
import "firebase/database";
import Chat from "./Chat";
import "./styles.css";

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const collectionRef = collection(db, "channels");

  const toggleVisibility = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const handleAddServer = async () => {
    const channelName = prompt("Create your Channel");
    if (channelName) {
      try {
        const dataToAdd = { channelName: channelName };
        await addDoc(collectionRef, dataToAdd).then((doc) => {
          getDocs(collectionRef).then((data) => {
            const newList = data.docs.find((_doc) => _doc.id === doc.id).data();
            setLists([...lists, { id: doc.id, ...newList }]);
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const newData = [];
      querySnapshot.forEach((doc) =>
        newData.push({ id: doc.id, ...doc.data() })
      );
      setLists(newData);
    };
    fetchCollectionData();
  }, [collectionRef]);

  const handleSignOut = async () => {
    await auth.signOut().then(() => {
      navigate("/");
    });
  };

  if (!user) {
    navigate("/");
    return;
  }

  return (
    <>
      <div className="relative flex h-screen">
        <div
          className={`absolute sm:min-w-max sm:h-screen transition-transform duration-500 ease-in-out transform-none ${
            isExpanded ? "-translate-x-1" : "translate-x-0"
          }
         flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max h-full`}
        >
          <div className="server-default  rounded-full hover:bg-discord_purple">
            <a href="/channels">
              <img src={discordWhite} alt="" className="h-7 w-9" />
            </a>
          </div>
          <hr className="border-[#2f3136] border h-[2px] w-8 mx-auto" />
          <ServerIcon image={image2} />
          <ServerIcon image={image5} />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 w-9 group-hover:text-white " />
          </div>
          <div className="server-default hover:bg-discord_green group">
            <Icon
              icon="mdi:compass"
              width="24"
              height="24"
              className="text-discord_green h-7 
            w-9 group-hover:text-white "
            />
          </div>
          <hr className="border-[#2f3136] border h-[2px]  w-8 mx-auto" />
          <div className="server-default hover:bg-discord_green group">
            <Icon
              icon="material-symbols:download"
              width="24"
              height="24"
              className="text-discord_green h-7 w-9 group-hover:text-white "
            />
          </div>
        </div>

        <div
          className={`relative ml-16 sm:w-46 sm:h-screen transition-transform duration-500 ease-in-out transform-none ${
            isExpanded ? "-translate-x-8" : "translate-x-0"
          } bg-discord_channelBg flex flex-col min-w-max`}
        >
          <h2
            className="flex text-white font-bold text-sm items-center
             justify-between border-b border-gray-800 p-4 hover:bg-discord_serverHoverNameBg
             cursor-pointer"
          >
            NEXTGen...
            <ChevronDownIcon className="h-6 ml-2" />
          </h2>
          <div className="text-discord_channelText flex-grow overflow-y-scroll custom-scrollbar">
            <div
              className="flex items-center p-2 mb-2 m-2 rounded-md font-medium cursor-pointer
             bg-discord_chatInputBg text-white group"
            >
              <Icon
                icon="solar:hashtag-chat-broken"
                width="24"
                height="24"
                className="h-5 mr-2"
              />
              <h4 className="font-semibold">Browse Channels</h4>
              <PlusIcon
                className="h-6 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddServer}
              />
            </div>
            <hr className="border-discord_chatInputBg h-[2px] my-6 mx-2" />
            <div
              className="flex flex-col space-y-2 px-2 mb-4 group"
              onClick={toggleVisibility}
            >
              {lists.map((listItem) => (
                <Channel
                  className="mb-12"
                  key={listItem.id}
                  id={listItem.id}
                  channelName={listItem.channelName}
                />
              ))}
            </div>
          </div>
          <div
            className="bg-discord_userSectionBg p-2 flex justify-between items-center
            space-x-6"
          >
            <div className="flex items-center space-x-1">
              <ServerIcon
                image={user.photoURL}
                className="h-10 mr-2"
                onClick={handleSignOut}
              />
              <h4 className="text-white text-xs font-medium">
                {user.displayName}
                <span className="text-discord_userSectionText block">
                  #{user.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="text-gray-400 flex items-center">
              <div className="icon-container">
                <MicrophoneIcon className="h-5 icon" />
              </div>
              <div className="icon-container">
                <Icon
                  icon="jam:headset-f"
                  width="24"
                  height="24"
                  className="h-5 icon space-x-2"
                />
                {/* <Icon icon="ic:round-headset" className="h-5 w-6 icon" /> */}
              </div>
              <div className="icon-container">
                <Cog8ToothIcon className="h-5 icon" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative -left-0 sm:pr-46 sm:h-screen
          transition-transform duration-500 ease-in-out sm:transform ${
            isExpanded ? "translate-x-0" : "-translate-x-2/3"
          } bg-discord_serverBg flex-grow lg:transform-none`}
        >
          <Chat onClick={toggleVisibility} />
        </div>
      </div>
    </>
  );
}

export default Home;
