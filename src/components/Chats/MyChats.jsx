import { useConfig, useMedia } from "../../hook/hook";
import axios from "../../api/baseUrl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ChatState } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../utils/ChatLogic";
import GroupChatModal from "../Modals/GroupChatModal";
import { memo } from "react";
import { USER_INFO_KEY } from "../../constants";
const MyChats = () => {
  const { token } = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  const isMobile = useMedia("(max-width: 768px)");
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const config = useConfig(token);

  const { selectedChat, setSelectedChat, chats, setChats, fetchAgain } =
    ChatState();

  //Handle Fetch Chats
  const handleFetchChats = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/chat", config);
      setChats(data && data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //Handle Selected Chats
  const handleSelectedChats = (chat) => {
    setSelectedChat(chat);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem(USER_INFO_KEY)));
    handleFetchChats();
  }, [fetchAgain]);

  const shortString = (str) => {
    return str?.length > 12 ? `${str.slice(0, 12)}...` : str;
  };

  const selectChat = (chat) => {
    return selectedChat && selectedChat._id === chat._id;
  };
  return (
    <div
      id="aside"
      className="bg-white max-w-[100%]  rounded-[6px] h-[86.5vh] "
      style={{ display: isMobile && selectedChat ? "none" : "block" }}
    >
      <div className="container py-[15px] px-[15px] flex flex-col gap-[10px] h-[100%] w-[100%] max-w-[100%]">
        <div className="top flex items-center justify-between">
          <div className="heading text-[22px] sm:text-[26px]">
            <h1 onClick={handleFetchChats}> My Chats </h1>
          </div>

          <GroupChatModal />
        </div>

        <div className="chats_grid bg-[#F8F8F8] rounded-[6px]  border-solid border-[1px] border-[#ededed] h-[75vh] overflow-auto  ">
          <div className="flex flex-col py-[15px] px-[10px] rounded-lg w-[100%] h-[100%]">
            {!loading ? (
              chats ? (
                <div className="flex flex-col gap-[10px]">
                  {chats?.map((chat) => (
                    <Box
                      onClick={() => handleSelectedChats(chat)}
                      className="cursor-pointer rounded-lg px-[15px] py-[10px]"
                      bg={selectChat(chat) ? "#38B2AC" : "#E8E8E8"}
                      color={selectChat(chat) ? "white" : "black"}
                      key={chat?._id}
                    >
                      <div className="font-Work sm:text-[18.5px] text-[16px]">
                        {!chat?.isGroupChat
                          ? getSender(loggedUser, chat?.users)
                          : chat?.chatName}
                      </div>
                      {chat?.latestMessage && (
                        <div className="flex items-center justify-start gap-2">
                          <h1 className="text-[14px] font-Work font-[600]">
                            {shortString(chat?.latestMessage?.sender?.name)}
                          </h1>
                          <p className="text-[12px] line-clamp-1">
                            {chat?.latestMessage.content}
                          </p>
                        </div>
                      )}
                    </Box>
                  ))}
                </div>
              ) : (
                <ChatLoading />
              )
            ) : (
              <ChatLoading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MyChats);
