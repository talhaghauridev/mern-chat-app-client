import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useConfig, useNetwork } from "../../hook/hook";
import axios from "../../api/baseUrl";
import { toast } from "react-toastify";
import ChatLoading from "../Chats/ChatLoading";
import UserListIItem from "../Chats/UserListIItem";
import { SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { USER_INFO_KEY } from "../../constants";
const SearchSidebar = () => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const network = useNetwork();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const { token } = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  //Handle Search Users
  const handleSearch = async () => {
    try {
      if (search.trim()) {
        setLoading(true);
        const config = useConfig(token);

        const { data } = await axios.get(`/user?search=${search}`, config);

        setSearchResult(data?.users);
        setLoading(false);

        console.log(config, searchResult);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  ///Handle Access Users
  const handleAccess = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);

      const config = useConfig(token);
      const { data } = await axios.post("/chat", { userId }, config);
      if (!chats?.find((c) => c?._id === data?._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
      console.log("selectedChat", selectedChat, "data", data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoadingChat(false);
    }
  };

  return (
    <>
      <div className="w-[100%] text-start">
        <Tooltip
          label="Search Users to chat"
          hasArrow
          placement="bottom"
          className="max-w-fit"
        >
          <div
            className="font-Work text-[black] text-[16px] flex gap-[8px] cursor-pointer font-medium max-w-fit items-center justify-start"
            onClick={onOpen}
          >
            <SearchIcon />
            <span>Search User</span>
          </div>
        </Tooltip>
      </div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent width={"600px"}>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <div className="flex gap-[10px]">
              <Input
                placeholder="Search Users name or email"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyUp={(e) => {
                  search?.trim() && e.key === "Enter" && handleSearch();
                }}
              />
              <Button
                onClick={() => {
                  search?.trim() && handleSearch();
                }}
              >
                Go
              </Button>
            </div>

            <div className=" py-[20px] flex flex-col gap-[10px]">
              {loading ? (
                <ChatLoading />
              ) : search && searchResult?.length > 0 ? (
                searchResult?.map((user) => (
                  <>
                    <UserListIItem
                      user={user}
                      key={user?._id}
                      handleFunction={() => handleAccess(user?._id)}
                    />
                  </>
                ))
              ) : (
                <>
                  <h1>User not found</h1>
                </>
              )}
            </div>
            {loadingChat && <Spinner />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchSidebar;
