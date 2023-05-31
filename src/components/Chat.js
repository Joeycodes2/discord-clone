import React, { useRef, useState, useEffect } from "react";
import {
  FaceSmileIcon,
  GifIcon,
  GiftIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { Icon } from "@iconify/react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import "firebase/database";
import Messages from "./Messages";
import "./styles.css";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const chatRef = useRef(null);
  const [message, setMessage] = useState("");
  const [subcollectionDocs, setSubcollectionDocs] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setMessage(newValue);
  }

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const submitChat = async (e) => {
    e.preventDefault();
    if (message !== "") {
      const specificChannelIdRef = doc(db, "channels", channelId);
      const channelChatSubColName = "channelChatCollection";
      const channelChatSubColRef = collection(
        specificChannelIdRef,
        channelChatSubColName
      );
      const dataToSubmit = {
        timestamp: serverTimestamp(),
        message: message,
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      };
      await addDoc(channelChatSubColRef, dataToSubmit).then((doc) => {
        getDocs(channelChatSubColRef).then((data) => {
          const newData = data.docs.find((_doc) => _doc.id === doc.id).data();
          setSubcollectionDocs([
            ...subcollectionDocs,
            {
              id: doc.id,
              ...newData,
            },
          ]);
        });
      });
      setMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    const fetchSubcollectionDocuments = async () => {
      const mainCollectionName = "channels";
      const mainCollectionRef = collection(db, mainCollectionName);
      const querySnapshot = await getDocs(mainCollectionRef);
      const specificDocument = querySnapshot.docs.find(
        (doc) => doc.id === channelId
      );

      if (specificDocument) {
        const channelChatSubColName = "channelChatCollection";
        const specificChannelIdRef = doc(db, "channels", channelId);
        const subcollectionRef = collection(
          specificChannelIdRef,
          channelChatSubColName
        );
        const orderedQuery = query(
          subcollectionRef,
          orderBy("timestamp", "asc")
        );
        const subcollectionSnapshot = await getDocs(orderedQuery);
        const newData = [];
        subcollectionSnapshot.docs.map((doc) =>
          newData.push({
            timestamp: doc.timestamp,
            id: doc.id,
            ...doc.data(),
          })
        );
        setSubcollectionDocs(newData);
      }
    };
    fetchSubcollectionDocuments();
  }, [channelId, channelName, subcollectionDocs]);

  return (
    <div className="flex flex-col h-screen">
      <header
        className="flex items-center justify-between space-x-5 border-b border-gray-800
         p-4 -mt-1"
      >
        <div className="flex items-center space-x-1">
          <Icon
            icon="prime:hashtag"
            width="26"
            height="26"
            className="h-6 text-[#b9bbbe]"
          />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3 ">
          <Icon
            icon="solar:hashtag-chat-bold"
            width="24"
            height="24"
            className="icon"
          />
          <Icon icon="subway:bell" width="18" height="21" className="icon" />
          <Icon
            icon="fluent-mdl2:pinned-solid"
            width="20"
            height="22"
            className="icon"
          />
          <Icon icon="mdi:users" width="26" height="26" className="icon" />
          <div className="flex bg-[#202225] text-sm p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none
             text-white placeholder-[#72767d]"
            />
            <MagnifyingGlassIcon className="h-5 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      <main className="flex-grow overflow-y-auto custom-scrollbar sm:overflow-y-auto sm:custom-scrollbar">
        {subcollectionDocs.map((doc) => (
          <Messages
            key={doc.id}
            id={doc.id}
            timestamp={doc.timestamp}
            message={doc.message}
            name={doc.name}
            photoURL={doc.photoURL}
            email={doc.email}
          />
        ))}
        <div ref={chatRef} className="pb-16" />
      </main>
      <div className="flex items-center p-2.5 bg-discord_chatInputBg mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4 h-8 w-8" />
        <form className="flex-grow w-full">
          <input
            type="text"
            disabled={!channelId}
            className="bg-transparent focus:outline-none text-discord_chatInputTxt w-full
             placeholder-[#72767d] text-md pr-4"
            onChange={handleChange}
            value={message}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
          />
          <button type="submit" hidden onClick={submitChat}>
            send
          </button>
        </form>
        <GiftIcon className="icon mr-3 h-8 w-8" />
        <GifIcon className="icon mr-3 h-8 w-8" />
        <Icon
          icon="lucide:sticker"
          color="#b9bbbe"
          width="26"
          height="26"
          className="icon mr-3"
        />
        <FaceSmileIcon className="icon h-8 w-8" />
      </div>
    </div>
  );
}

export default Chat;
