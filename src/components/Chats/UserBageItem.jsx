import { Box, CloseButton } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { ChatState } from "@/context/ChatProvider";
import { USER_INFO_KEY } from "@/constants";

const UserBageItem = ({ user, handleFunction }) => {
   const { userInfo } = JSON.parse(localStorage.getItem(USER_INFO_KEY));
   const { selectedChat } = ChatState();
   const isAdmin = useMemo(() => selectedChat?.groupAdmin?._id === userInfo?._id, [selectedChat, userInfo]);

   return (
      <>
         <Box
            className={`px-[6px] py-[5px] mx-[8]  flex gap-[4px]  rounded-lg text-[12px] text-[white] bg-[purple]   items-center justify-start max-w-fit `}
            onClick={() => isAdmin && handleFunction()}>
            {user?.name}

            {isAdmin && (
               <CloseButton
                  pl={1}
                  height={"fit-content"}
                  className="h-fit"
               />
            )}
         </Box>
      </>
   );
};

export default memo(UserBageItem);
