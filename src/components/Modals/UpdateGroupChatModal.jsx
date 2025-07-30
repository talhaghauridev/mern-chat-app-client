import axios from "@/api/baseUrl";
import UserBageItem from "@/components/Chats/UserBageItem";
import UserListIItem from "@/components/Chats/UserListIItem";
import Modal from "@/components/ui/Modal/Modal";
import { USER_INFO_KEY } from "@/constants";
import { ChatState } from "@/context/ChatProvider";
import { useConfig } from "@/hook/hook";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { toast } from "react-toastify";

const UpdateGroupChatModal = ({ handleFetchMessages }) => {
  const { user, token } = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain } = ChatState();
  const [groupChatName, setGroupChatName] = useState(selectedChat?.chatName);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const config = useConfig(token);

  //Handle Delete User

  const handleRemove = async (user1) => {
    if (selectedChat?.groupAdmin?._id !== user._id && user1?._id !== user._id) {
      return toast.success("Only admins can be remove some! ");
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        "/chat/group/remove",
        {
          chatId: selectedChat?._id,
          userId: user1?._id,
        },
        config
      );

      if (user1?._id === user?._id) {
        setSelectedChat();
        setFetchAgain(!fetchAgain);
      } else {
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setSearchResult([...searchResult, user1]);
        handleFetchMessages();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //Handle Rename Group Name

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const { data } = await axios.put(
        "/chat/group/rename",
        {
          chatId: selectedChat?._id,
          chatName: groupChatName,
        },

        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      onClose();
      toast.success("Rename Group Success");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      setGroupChatName("");
    }
  };

  //Handle Search Users

  const handleSearch = async (query) => {
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

  //Handle Add User

  const handleAddUser = async (user1) => {
    if (selectedChat?.users?.find((u) => u._id === user1._id)) {
      return toast.error("User is Already in group!");
    }

    setSearchResult(searchResult.filter((i) => i?._id !== user1?._id));

    if (selectedChat?.groupAdmin._id !== user._id) {
      return toast.success("Only admins can be add some! ");
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        "/chat/group/add",
        { chatId: selectedChat?._id, userId: user1?._id },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<ViewIcon fontSize="17px" />}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <ModalHeader className="flex items-center justify-center ">
          <h1 className="text-[28px] sm:text-[35px] font-Work w-[100%] text-center font-[400] mt-[10px]">
            {selectedChat?.chatName}
          </h1>
        </ModalHeader>

        <ModalBody>
          <div className="flex gap-[6px] pt-[15px] flex-wrap">
            {selectedChat?.users?.map((user) => (
              <>
                <UserBageItem
                  key={user?._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              </>
            ))}
          </div>

          {selectedChat?.groupAdmin?._id === user?._id && (
            <div className=" flex flex-col gap-[10px] py-[10px] pt-[20px]">
              <FormControl className="flex gap-[6px]">
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  value={groupChatName}
                />

                <Button
                  colorScheme="blue"
                  variant="solid"
                  onClick={handleRename}
                  isLoading={renameLoading}>
                  Update
                </Button>
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add User to Group"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
            </div>
          )}

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
                    handleFunction={() => handleAddUser(user)}
                    grid={"0.2fr 1fr"}
                  />
                </>
              ))
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={() => handleRemove(user)}>
            Leave Group
          </Button>
        </ModalFooter>
        <ModalCloseButton />
      </Modal>
    </>
  );
};

export default memo(UpdateGroupChatModal);
