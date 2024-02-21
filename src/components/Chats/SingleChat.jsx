import {
  FormControl,
  IconButton,
  useDisclosure,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Messages from "../Message/Messages";
import { ChatState } from "../../context/ChatProvider";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { useConfig, useMedia } from "../../hook/hook";
import { getSender, getSenderFull } from "../../utils/ChatLogic";
import ProfileModel from "../Modals/ProfileModel";
import UpdateGroupChatModal from "../Modals/UpdateGroupChatModal";
import { useEffect, useState } from "react";
import axios from "../../api/baseUrl";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { memo } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { USER_INFO_KEY } from "../../constants";

var selectedChatCompre;
const SingleChat = () => {
  const socket = useMemo(() => io.connect(import.meta.env.VITE_API_URL), []);
  const { token } = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const {
    user,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMedia("(max-width: 768px)");
  const config = useConfig(token);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  //Handle Fetch Messages
  const handleFetchMessages =  async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`/message/${selectedChat._id}`, config);

      setMessages(data);
      setLoading(false);
      socket.emit("join_chat", selectedChat?._id);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }
  //Handle Send Message
  const handleSendMessage = async () => {
    try {
      setNewMessage("");
      const { data } = await axios.post(
        "/message",
        { content: newMessage, chatId: selectedChat._id },
        config
      );

      setMessages([...messages, data]);
      socket.emit("new_message", data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // Handle Typing
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnection) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop_typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.emit("setup", user?.user);
    socket.on("connection", () => setSocketConnection(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    handleFetchMessages();
    selectedChatCompre = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message_recieved", (newMessageRecived) => {
      console.log("Hello", newMessageRecived);

      if (
        !selectedChatCompre ||
        selectedChatCompre?._id !== newMessageRecived?.chat?._id
      ) {
        if (!notification?.includes(newMessageRecived)) {
          setNotification([newMessageRecived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
        console.log("Hello");
      } else {
        setMessages([...messages, newMessageRecived]);
        setFetchAgain(!fetchAgain);
        
      }
    });
  }, [messages, notification, newMessage,selectedChat]);
  console.log(messages);
  console.log(fetchAgain);

  return (
    <>
      {selectedChat ? (
        <>
          <div className="top flex items-center justify-between h-[100%] max-h-[40px]">
            <IconButton
              icon={<ArrowBackIcon />}
              display={isMobile ? "flex" : "none"}
              onClick={() => setSelectedChat("")}
            />
            <div className="heading">
              <h1 className="font-Work text-[20px] sm:text-[26px]">
                {!selectedChat?.isGroupChat ? (
                  <>
                    {getSender(user, selectedChat?.users)}

                    <ProfileModel
                      user={getSenderFull(user, selectedChat?.users)}
                      isOpen={isOpen}
                      onClose={onClose}
                    />
                  </>
                ) : (
                  selectedChat?.chatName?.toUpperCase()
                )}
              </h1>
            </div>

            <>
              {!selectedChat?.isGroupChat ? (
                <IconButton
                  onClick={onOpen}
                  icon={<ViewIcon fontSize="17px" />}
                />
              ) : (
                <UpdateGroupChatModal
                  handleFetchMessages={handleFetchMessages}
                />
              )}
            </>
          </div>

          <div className="chats_grid bg-[#E8E8E8] h-[75vh] overflow-auto rounded-[6px]  border-solid border-[1px] border-[#ededed] relative will-change-scroll  ">
            <div className="h-[100%] flex flex-col items-center ">
              {loading ? (
                <>
                  <div className="messageLoading h-[100%] w-[100%] flex items-center justify-center ">
                    <Spinner w={20} h={20} size={"xl"} margin={"auto"} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-between w-[100%] h-[100%]">
                    <Messages messages={messages} />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bottom_search sticky bottom-[30px] w-[100%] px-[6px]">
            <FormControl
              className="relative rounded-[6px]"
              onKeyDown={(e) =>
                newMessage?.trim() && e.key === "Enter" && handleSendMessage(e)
              }
              isRequired
              bg="whitesmoke"
            >
              <Input
                variant="filled"
                bg="whitesmoke"
                type="text"
                name="search"
                placeholder="Enter a Message..."
                onChange={handleTyping}
                value={newMessage}
                paddingY="15px"
                height="45px"
                fontSize="17px"
              />
            </FormControl>
          </div>
        </>
      ) : (
        <>
          <div className="h-[100%] w-[100%] flex items-center justify-center dark:bg-black dark:text-white">
            <h1 className="text-[30px] font-Work">
              Click on a user on start chating
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default memo(SingleChat);
