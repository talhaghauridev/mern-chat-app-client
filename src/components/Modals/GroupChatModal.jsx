import {
  Button,
  FormControl,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "../../api/baseUrl";
import Modal from "../ui/Modal/Modal";
import { useConfig, useMedia } from "../../hook/hook";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import UserListIItem from "../Chats/UserListIItem";
import UserBageItem from "../Chats/UserBageItem";
import { ChatState } from "../../context/ChatProvider";
import { useLocation } from "react-router-dom";
import { memo } from "react";
import { USER_INFO_KEY } from "../../constants";

const GroupChatModal = () => {
  const { token } = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const isMobile = useMedia("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chats, setChats } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const config = useConfig(token);

  //Handle Search Users
  const handleSearchUser = async (query) => {
    setSearch(query);

    if (!query) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data?.users);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  //Handle Submit

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      return toast.error("Please fill all the fields");
    }

    try {
      const { data } = await axios.post(
        "/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers?.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast.success("Create Group Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  //Handle Delete Users
  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers?.filter((sel) => sel?._id !== user?._id));
    setSearchResult([...searchResult, user]);
  };

  //Handle Add User to Group
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return toast.error("User already added");
    }
    setSearchResult(searchResult.filter((i) => i?._id !== userToAdd?._id));
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <Button
        d="flex"
        onClick={onOpen}
        fontSize={isMobile ? "14px" : "16px"}
        rightIcon={<AddIcon />}
      >
        New Group Chat
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalHeader className="flex items-center justify-center ">
          <h1 className="text-[28px] sm:text-[35px] font-Work w-[100%] text-center font-[400] mt-[10px]">
            Create Group Chat
          </h1>
        </ModalHeader>

        <ModalBody>
          <FormControl>
            <Input
              placeholder="Chat Name"
              mb={3}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Add User"
              mb={1}
              onChange={(e) => handleSearchUser(e.target.value)}
            />
          </FormControl>

          <div className="flex gap-[6px] pt-[15px] flex-wrap">
            {selectedUsers?.map((user) => (
              <>
                <UserBageItem
                  user={user}
                  key={user?._id}
                  handleFunction={() => handleDelete(user)}
                />
              </>
            ))}
          </div>

          <div className="flex flex-col gap-[15px] py-[15px] ">
            {loading ? (
              <>
                <div className="w-[100%] flex items-center justify-center h-[40px]">
                  <Spinner />
                </div>
              </>
            ) : (
              searchResult?.slice(0, 4)?.map((user) => (
                <>
                  <UserListIItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                    grid={"0.2fr 1fr"}
                  />
                </>
              ))
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Create Chat
          </Button>
        </ModalFooter>
        <ModalCloseButton />
      </Modal>
    </>
  );
};

export default memo(GroupChatModal);
