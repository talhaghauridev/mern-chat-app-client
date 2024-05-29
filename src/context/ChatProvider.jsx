import {useContext, useEffect, useState,createContext } from "react";
import { useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../constants";

const Chatcontext = createContext()

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [notification, setNotification] = useState([]);
  const [latestMessages, setLatestMessages] = useState([]);
  useEffect(() => {
    const user_Info = JSON.parse(localStorage.getItem(USER_INFO_KEY));

    if (!user_Info) {
      navigate("/login");
    }
    setUser(user_Info);
  }, []);

  return (
    <Chatcontext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchAgain,
        setFetchAgain,
        notification,
        setNotification,
        latestMessages, setLatestMessages
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};

export const ChatState = () => {
  return useContext(Chatcontext);
};

export default ChatProvider;
