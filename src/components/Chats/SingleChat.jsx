import {
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
  useMemo,
  Suspense,
} from "react";
import {
  FormControl,
  IconButton,
  useDisclosure,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Messages from "../Message/Messages";
import { ChatState } from "../../context/ChatProvider";
import { useConfig, useMedia } from "../../hook/hook";
import { getSender, getSenderFull } from "../../utils/ChatLogic";
import axios from "../../api/baseUrl";
import { USER_INFO_KEY } from "../../constants";
import cn from "../../utils/cn";
const ProfileModel = lazy(() => import("../Modals/ProfileModel"));
const UpdateGroupChatModal = lazy(() =>
  import("../Modals/UpdateGroupChatModal")
);
var selectedChatCompare;

const SingleChat = () => {
  const { token } = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_API_URL, {
        auth: { token },
      }),
    [token]
  );

  const {
    user,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
    latestMessages,
    setLatestMessages,
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
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const messagesRef = useRef(null);
  const chatContainerRef = useRef(null);
  // Handle Fetch Messages
  const handleFetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`/message/${selectedChat._id}`, config);

      setMessages(data);
      setLoading(false);
      socket.emit("join_chat", selectedChat?._id);
      handleScrollBottom();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // Handle Send Message
  const handleSendMessage = async () => {
    try {
      setNewMessage("");
      const { data } = await axios.post(
        "/message",
        { content: newMessage, chatId: selectedChat._id },
        config
      );

      setMessages([...messages, data]);
      if (data) {
        handleScrollBottom();
      }
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

  // Handle Scroll Bottom
  const handleScrollBottom = useCallback(() => {
    if (messagesRef?.current) {
      messagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messagesRef]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setIsScrolledToBottom(scrollHeight - scrollTop === clientHeight);
  }, []);

  const updateLatestMessages = (newMessage) => {
    setLatestMessages((prevMessages) => {
      const filteredMessages = prevMessages.filter(
        (msg) => msg.sender._id !== newMessage.sender._id
      );
      return [...filteredMessages, newMessage];
    });
  };
  // Setup socket connection and event listeners
  useEffect(() => {
    socket.emit("setup", user?.user);
    socket.on("connection", () => setSocketConnection(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, [socket, user]);

  // Fetch messages when selectedChat changes
  useEffect(() => {
    handleFetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    handleScrollBottom();
  }, [messages, handleScrollBottom]);

  // Handle incoming messages
  useEffect(() => {
    socket.on("message_recieved", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageReceived?.chat?._id
      ) {
        if (!notification?.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
        setFetchAgain(!fetchAgain);
      }
      updateLatestMessages(newMessageReceived);
      handleScrollBottom();
    });
  }, [
    socket,
    messages,
    notification,
    fetchAgain,
    selectedChatCompare,
    handleScrollBottom,
  ]);

  // Add scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef?.current;
    chatContainer?.addEventListener("scroll", handleScroll);
    return () => {
      chatContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <>
      {selectedChat ? (
        <>
          <div className=" flex items-center justify-between h-[86.5vh] max-h-[40px]">
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

                    <Suspense fallback={null}>
                      <ProfileModel
                        user={getSenderFull(user, selectedChat?.users)}
                        isOpen={isOpen}
                        onClose={onClose}
                      />
                    </Suspense>
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
                <Suspense fallback={"loading"}>
                  <UpdateGroupChatModal
                    handleFetchMessages={handleFetchMessages}
                  />
                </Suspense>
              )}
            </>
          </div>

          <div
            ref={chatContainerRef}
            className="chats_grid bg-[#E8E8E8] h-[75vh] overflow-auto rounded-[6px]  border-solid border-[1px] border-[#ededed] relative"
          >
            <div ref={messagesRef}>
              <div className="h-[100%] flex flex-col items-center">
                {loading ? (
                  <div className="messageLoading h-[100%] w-[100%] flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner w={20} h={20} size={"xl"} margin={"auto"} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-between w-[100%] h-[100%]">
                    <Messages messages={messages} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute w-full  items-center justify-center flex bottom-[85px]">
            <div
              className={cn(
                "sticky flex items-center justify-center transition-all",
                !isScrolledToBottom && !loading
                  ? "bottom-[85px] opacity-1  "
                  : "bottom-0 opacity-0 "
              )}
            >
              <button
                className=" text-[26px] rounded-full backdrop-grayscale bg-white p-[6px] flex items-start justify-center"
                onClick={handleScrollBottom}
              >
                <ArrowDownIcon />
              </button>
            </div>
          </div>

          <div className="bottom_search sticky w-[100%] px-[6px]">
            <FormControl
              className="relative rounded-[6px] border-[1px]  border-solid  border-[#0000001c]"
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
        <div className="h-[100%] w-[100%] flex items-center justify-center dark:bg-black dark:text-white">
          <h1 className="text-[30px] font-Work">
            Click on a user to start chatting
          </h1>
        </div>
      )}
    </>
  );
};

export default memo(SingleChat);
