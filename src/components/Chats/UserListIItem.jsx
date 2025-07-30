import { Box, Text } from "@chakra-ui/react";
import { memo } from "react";

const UserListIItem = ({ user, handleFunction, grid }) => {
   const name = user?.name && user?.name?.length > 16 ? `${user?.name?.substring(0, 16)}...` : user?.name;

   const email = user?.email && user?.email?.length > 17 ? `${user?.email?.substring(0, 17)}...` : user?.email;
   return (
      <div
         className="w-[100%]  text-[black] grid items-center justify-center bg-[#E8E8E8] py-[10px] px-[8px] cursor-pointer rounded-lg transition-all
         hover:bg-[#38B2AC] hover:text-[white] "
         style={{ gridTemplateColumns: grid ? grid : "0.3fr 1fr" }}
         onClick={handleFunction}>
         <p className="flex items-center justify-center h-[100%] w-[100%]">
            <img
               src={user?.avatar?.url}
               className="w-[100%] max-w-[40px]  rounded-[100%]"
            />
         </p>

         <Box>
            <Text className="font-Work text-[18px]">{name}</Text>
            <Text className="overflow-hidden font-Work flex gap-[4px] items-center justify-start">
               <b className="font-Work text-[13px] font-[600] ">Email:</b>
               <span className="text-[13px]">{email}</span>
            </Text>
         </Box>
      </div>
   );
};

export default memo(UserListIItem);
