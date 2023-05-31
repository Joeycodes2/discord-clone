import React, { useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "./firebase";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/channelSlice";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

function Messages({ id, timestamp, message, name, photoURL, email }) {
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);
  const formattedTime = timestamp
    ? moment(timestamp.toDate()).format("LLL")
    : "";
  const specificChannelIdRef = doc(db, "channels", channelId);
  const channelSubColName = "channelChatCollection";
  const [chats, setChats] = useState([]);
  const channelSubColRef = collection(specificChannelIdRef, channelSubColName);

  const deleteChat = async () => {
    try {
      await getDocs(channelSubColRef).then((data) => {
        const chatId = data.docs.find((doc) => doc.id === id).id;
        const chatDocumentRef = doc(channelSubColRef, chatId);
        deleteDoc(chatDocumentRef);
        // console.log(`chat with ID ${chatId} successfully deleted`);
      });
      const orderedQuery = query(channelSubColRef, orderBy("timestamp", "asc"));
      const chatSnapshot = await getDocs(orderedQuery);
      chatSnapshot.docs.map((doc) =>
        setChats([...chats, { id: doc.id, ...doc.data() }])
      );
    } catch (error) {
      console.error("Error fetching updatedChat:", error);
    }
  };

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord_messageBg group">
      <img
        src={photoURL}
        alt=""
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl"
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-discord_message text-xs">{formattedTime}</span>
        </h4>
        <p className="text-sm text-[#dcddde]">{message}</p>
      </div>
      {user.email === email && (
        <div
          className="hover:bg-discord_deleteIcon text-discord_deleteIcon cursor-pointer p-1 ml-auto
        rounded-md hover:text-white"
          onClick={deleteChat}
        >
          <TrashIcon className="h-5 hidden group-hover:inline" />
        </div>
      )}
    </div>
  );
}

export default Messages;
