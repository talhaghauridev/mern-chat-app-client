import { memo } from "react";
import Modal from "@/components/ui/Modal/Modal";
import { Button, Image, ModalCloseButton } from "@chakra-ui/react";

const ProfileModel = ({ isOpen, onClose, user }) => {
   return (
      <>
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
            <ModalCloseButton />
            <div className=" px-[15px] py-[25px] flex flex-col gap-[20px]">
               <div className="heading">
                  <h1 className="text-center text-[28px] sm:text-[35px] mt-[10px]">{user?.name}</h1>
               </div>

               <div className="user_image text-center flex items-center justify-center">
                  <Image
                     className="font-Work rounded-[100%] w-[100%] max-w-[150px] object-contain border-[1px] border-solid border-[#edededed] p-[10px]"
                     src={user?.avatar?.url}
                     alt={user?.name}
                  />
               </div>

               <div className=" w-[100%] text-center ">
                  <span className="font-Work text-center text-[20px] ">Email : {user?.email}</span>
               </div>

               <div className="flex items-center justify-end">
                  <Button
                     variant={"outline"}
                     mr={3}
                     onClick={onClose}>
                     Close
                  </Button>
               </div>
            </div>
         </Modal>
      </>
   );
};

export default memo(ProfileModel);
