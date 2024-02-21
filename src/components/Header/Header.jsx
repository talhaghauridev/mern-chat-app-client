import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import ProfileModel from "../Modals/ProfileModel";
import { useNavigate } from "react-router-dom";
import SearchSidebar from "./SearchSidebar";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../utils/ChatLogic";
import { USER_INFO_KEY } from "../../constants";
const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  const { notification, setNotification, selectedChat, setSelectedChat } =
    ChatState();
  //Handle Logout User

  const handleLogout = () => {
    localStorage.removeItem(USER_INFO_KEY);
    navigate("/login");
  };

  const handleToggle = () => {
    // document.body.classList.toggle("dark");
    document["body"]["classList"]["toggle"]("dark");
  };
  console.log(notification);
  return (
    <>
      <header id="header" className="w-[100%]  bg-white ">
        <div className="container py-[10px] px-[15px] w-[100%] h-[100%] max-w-[100%] grid grid-cols-2 md:grid-cols-3 items-center justify-between ">
          {/* Search Box  */}

          <SearchSidebar />

          {/* Heading  */}

          <div className=" md:relative md:block absolute hidden ">
            <h1
              className="text-[28px] text-[#452B32] text-center"
              onClick={handleToggle}
            >
              Talk-A-Trive
            </h1>
          </div>

          {/* DropDowns  */}

          <div className="flex gap-[6px] items-center justify-end ">
            <div className="notification ">
              <Menu>
                <MenuButton className="font-Work bg-transparent cursor-pointer ">
                  <NotificationBadge
                    count={notification?.length}
                    effect={Effect.SCALE}
                  />
                  <NotificationsRoundedIcon />
                </MenuButton>
                <MenuList>
                  {!notification?.length && (
                    <>
                      <MenuItem>No New Messages</MenuItem>
                    </>
                  )}

                  {notification &&
                    notification?.map((noti) => (
                      <>
                        <MenuItem
                          key={noti?._id}
                          onClick={() => {
                            setSelectedChat(noti?.chat);
                            setNotification(
                              notification?.filter((i) => i !== noti)
                            );
                          }}
                        >
                          {noti?.chat?.isGroupChat
                            ? `New Message in ${noti.chat.chatName}`
                            : `New Message from ${getSender(
                                user,
                                noti?.chats?.users
                              )}`}
                        </MenuItem>
                      </>
                    ))}
                </MenuList>
              </Menu>
            </div>

            <div className="user">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg={"#00000000"}
                  className="font-Work bg-transparent cursor-pointer hover:bg-[#00000000] "
                >
                  <Avatar
                    name={user?.name}
                    src={user?.avatar?.url}
                    size="sm"
                    cursor="pointer"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpen}>My Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <ProfileModel isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
};

export default Header;
