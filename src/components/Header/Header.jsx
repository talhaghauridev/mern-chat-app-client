// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
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
import { Suspense, lazy } from "react";
import { BellIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import SearchSidebar from "./SearchSidebar";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../utils/ChatLogic";
import { USER_INFO_KEY } from "../../constants";
const ProfileModel = lazy(() => import("../Modals/ProfileModel"));

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
  console.log("Notification:", notification);
  notification &&
    notification.map((noti) => {
      console.log("Notification Users:", noti.chat.users);
      console.log("Sender:", getSender(user, noti.chat.users));
    });

  return (
    <>
  
      <header id="header" className="w-[100%]  bg-white ">
        <div className="container py-[10px] px-[15px] w-[100%] h-[100%] max-w-[100%] grid grid-cols-2 md:grid-cols-3 items-center justify-between ">
          {/* Search Box  */}

          <SearchSidebar />

          {/* Heading  */}

          <div className=" md:relative md:block absolute hidden ">
            <h1 className="text-[28px] text-[#452B32] text-center">
              Talk-A-Trive
            </h1>
          </div>

          {/* DropDowns  */}

          <div className="flex gap-[6px] items-center justify-end ">
            <div className="notification ">
              <Menu>
                <MenuButton className="font-Work bg-transparent cursor-pointer ">
                  <BellIcon className="text-[24px]" />
                </MenuButton>
                <MenuList>
                  {!notification?.length && (
                    <>
                      <MenuItem>No New Messages</MenuItem>
                    </>
                  )}

                  {notification &&
                    notification?.map((noti) => (
                      <MenuItem
                        key={noti._id}
                        className="relative inline-flex"
                        onClick={() => {
                          setSelectedChat(noti.chat);
                          setNotification(
                            notification.filter((i) => i !== noti)
                          );
                        }}
                      >
                        {noti.chat.isGroupChat
                          ? `New Message in ${noti.chat.chatName}`
                          : `New Message from ${getSender(
                              user,
                              noti.chat.users
                            )}`}
                        <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
                          {notification.length}
                        </span>
                      </MenuItem>
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
      {user && isOpen && (
        <Suspense fallback={null}>
          <ProfileModel isOpen={isOpen} onClose={onClose} user={user} />
        </Suspense>
      )}
    </>
  );
};

export default Header;
