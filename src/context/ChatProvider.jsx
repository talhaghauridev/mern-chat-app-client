import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../constants";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    const user_Info = JSON.parse(localStorage.getItem(USER_INFO_KEY));

    if (!user_Info) {
      navigate("/login");
    }
    setUser(user_Info);
  }, []);

  return (
    <ChatContext.Provider
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
